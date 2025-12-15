const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Car = require('../models/Car');
const Booking = require('../models/Booking');
const Contact = require('../models/Contact');
const Review = require('../models/Review');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const moment = require('moment');

// Admin dashboard stats
router.get('/dashboard/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const today = moment().startOf('day');
    const thisMonth = moment().startOf('month');
    
    // Get counts
    const totalCars = await Car.countDocuments();
    const availableCars = await Car.countDocuments({ availability: 'available' });
    const totalBookings = await Booking.countDocuments();
    const todayBookings = await Booking.countDocuments({
      createdAt: { $gte: today }
    });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const newUsersThisMonth = await User.countDocuments({
      role: 'customer',
      createdAt: { $gte: thisMonth }
    });
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    
    // Recent activities
    const recentBookings = await Booking.find()
      .populate('carId', 'name')
      .sort({ createdAt: -1 })
      .limit(5);
    
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      stats: {
        cars: { total: totalCars, available: availableCars },
        bookings: { total: totalBookings, today: todayBookings, pending: pendingBookings },
        users: { total: totalUsers, newThisMonth: newUsersThisMonth },
        contacts: { total: totalContacts, new: newContacts }
      },
      recentActivities: {
        bookings: recentBookings,
        contacts: recentContacts
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all users
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    
    let query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await User.countDocuments(query);
    
    res.json({
      users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user role
router.patch('/users/:id/role', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user
router.delete('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Prevent deleting admin users (safety measure)
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin users' });
    }
    
    // Delete user's bookings first (to handle foreign key constraints)
    await Booking.deleteMany({ userId: userId });
    
    // Delete user's reviews
    await Review.deleteMany({ userId: userId });
    
    // Delete the user
    await User.findByIdAndDelete(userId);
    
    res.json({ 
      message: 'User and all associated data deleted successfully',
      deletedUser: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user: ' + error.message });
  }
});

// Get all contacts with filters
router.get('/contacts', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    let query = {};
    if (status) query.status = status;
    
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Contact.countDocuments(query);
    
    res.json({
      contacts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update contact status
router.patch('/contacts/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get reviews for moderation
router.get('/reviews', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, isApproved } = req.query;
    
    let query = {};
    if (isApproved !== undefined) query.isApproved = isApproved === 'true';
    
    const skip = (page - 1) * limit;
    const reviews = await Review.find(query)
      .populate('carId', 'name')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Review.countDocuments(query);
    
    res.json({
      reviews,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve/reject review
router.patch('/reviews/:id/approve', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { isApproved } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Update car rating if approved
    if (isApproved) {
      const carReviews = await Review.find({ carId: review.carId, isApproved: true });
      const avgRating = carReviews.reduce((sum, r) => sum + r.rating, 0) / carReviews.length;
      
      await Car.findByIdAndUpdate(review.carId, {
        'ratings.average': avgRating,
        'ratings.count': carReviews.length
      });
    }
    
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Sales analytics
router.get('/analytics/sales', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let startDate;
    switch (period) {
      case 'week':
        startDate = moment().subtract(7, 'days');
        break;
      case 'month':
        startDate = moment().subtract(30, 'days');
        break;
      case 'year':
        startDate = moment().subtract(365, 'days');
        break;
      default:
        startDate = moment().subtract(30, 'days');
    }
    
    // Booking trends
    const bookingTrends = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate.toDate() }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Popular cars
    const popularCars = await Car.find()
      .sort({ views: -1, 'ratings.average': -1 })
      .limit(10)
      .select('name views ratings');
    
    res.json({
      bookingTrends,
      popularCars
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;