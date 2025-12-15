const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const { authenticateToken, requireAdmin, requireStaff } = require('../middleware/auth');
const moment = require('moment');

// Submit booking
router.post('/', async (req, res) => {
  try {
    console.log('📝 Booking submission received:', req.body);
    
    // Set default values for missing fields
    const bookingData = {
      ...req.body,
      preferredDate: req.body.preferredDate ? new Date(req.body.preferredDate) : new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to tomorrow
      preferredTime: req.body.preferredTime || '10:00 AM', // Default time
      bookingId: 'BK' + Date.now() + Math.floor(Math.random() * 1000) // Generate booking ID
    };
    
    // Find car details
    const car = await Car.findOne({ name: req.body.selectedCar });
    if (car) {
      bookingData.carId = car._id;
    }
    
    const booking = new Booking(bookingData);
    const savedBooking = await booking.save();
    
    console.log('✅ Booking saved successfully:', savedBooking._id);
    
    // TODO: Send confirmation email/SMS here
    
    res.status(201).json({ 
      success: true, 
      message: 'Booking request received! We will contact you within 24 hours.',
      data: savedBooking 
    });
  } catch (error) {
    console.error('❌ Booking save error:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Error submitting booking. Please try again.',
      error: error.message 
    });
  }
});

// Get all bookings with filters (admin/staff only)
router.get('/', authenticateToken, requireStaff, async (req, res) => {
  try {
    const { 
      status, 
      bookingType, 
      date, 
      page = 1, 
      limit = 20 
    } = req.query;
    
    let query = {};
    
    if (status) query.status = status;
    if (bookingType) query.bookingType = bookingType;
    if (date) {
      const startDate = moment(date).startOf('day');
      const endDate = moment(date).endOf('day');
      query.preferredDate = { $gte: startDate, $lte: endDate };
    }
    
    const skip = (page - 1) * limit;
    
    const bookings = await Booking.find(query)
      .populate('carId', 'name image price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Booking.countDocuments(query);
    
    res.json({
      bookings,
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

// Get booking by ID
router.get('/:id', authenticateToken, requireStaff, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('carId', 'name image price key');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status
router.patch('/:id/status', authenticateToken, requireStaff, async (req, res) => {
  try {
    const { status, notes, assignedStaff } = req.body;
    
    const updateData = { status };
    if (notes) updateData.notes = notes;
    if (assignedStaff) updateData.assignedStaff = assignedStaff;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('carId', 'name image price');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // TODO: Send status update notification to customer
    
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Reschedule booking
router.patch('/:id/reschedule', authenticateToken, requireStaff, async (req, res) => {
  try {
    const { preferredDate, preferredTime, notes } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        preferredDate: new Date(preferredDate),
        preferredTime,
        status: 'rescheduled',
        notes: notes || 'Booking rescheduled'
      },
      { new: true }
    ).populate('carId', 'name image price');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // TODO: Send reschedule notification to customer
    
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get booking calendar data
router.get('/calendar/data', authenticateToken, requireStaff, async (req, res) => {
  try {
    const { month, year } = req.query;
    
    const startDate = moment(`${year}-${month}-01`).startOf('month');
    const endDate = moment(`${year}-${month}-01`).endOf('month');
    
    const bookings = await Booking.find({
      preferredDate: { $gte: startDate, $lte: endDate },
      status: { $in: ['pending', 'confirmed'] }
    })
    .populate('carId', 'name')
    .sort({ preferredDate: 1 });
    
    // Group bookings by date
    const calendarData = {};
    bookings.forEach(booking => {
      const dateKey = moment(booking.preferredDate).format('YYYY-MM-DD');
      if (!calendarData[dateKey]) {
        calendarData[dateKey] = [];
      }
      calendarData[dateKey].push(booking);
    });
    
    res.json(calendarData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get today's bookings
router.get('/today/list', authenticateToken, requireStaff, async (req, res) => {
  try {
    const today = moment().startOf('day');
    const tomorrow = moment().add(1, 'day').startOf('day');
    
    const bookings = await Booking.find({
      preferredDate: { $gte: today, $lt: tomorrow },
      status: { $in: ['pending', 'confirmed'] }
    })
    .populate('carId', 'name image')
    .sort({ preferredTime: 1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's bookings (for customer dashboard)
router.get('/user/my-bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ 
      customerEmail: req.user.email 
    })
    .populate('carId', 'name image price key')
    .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel booking (customer can cancel their own)
router.patch('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user can cancel this booking
    if (req.user.role === 'customer' && booking.customerEmail !== req.user.email) {
      return res.status(403).json({ message: 'You can only cancel your own bookings' });
    }
    
    booking.status = 'cancelled';
    booking.notes = req.body.reason || 'Cancelled by customer';
    await booking.save();
    
    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete booking (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
