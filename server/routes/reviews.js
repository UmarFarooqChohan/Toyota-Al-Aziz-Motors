const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Car = require('../models/Car');
const { authenticateToken } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Submit a review
router.post('/', authenticateToken, [
  body('carId').notEmpty().withMessage('Car ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('title').notEmpty().withMessage('Review title is required'),
  body('comment').notEmpty().withMessage('Review comment is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { carId, rating, title, comment, images } = req.body;

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user already reviewed this car
    const existingReview = await Review.findOne({ carId, userId: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this car' });
    }

    const review = new Review({
      carId,
      userId: req.user._id,
      customerName: req.user.name,
      rating,
      title,
      comment,
      images: images || []
    });

    await review.save();

    res.status(201).json({
      message: 'Review submitted successfully. It will be published after moderation.',
      review
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reviews for a car
router.get('/car/:carId', async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt' } = req.query;
    
    const skip = (page - 1) * limit;
    
    const reviews = await Review.find({ 
      carId: req.params.carId, 
      isApproved: true 
    })
    .populate('userId', 'name')
    .sort({ [sortBy]: -1 })
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await Review.countDocuments({ 
      carId: req.params.carId, 
      isApproved: true 
    });
    
    // Get rating distribution
    const ratingDistribution = await Review.aggregate([
      { $match: { carId: req.params.carId, isApproved: true } },
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);
    
    res.json({
      reviews,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      },
      ratingDistribution
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark review as helpful
router.post('/:id/helpful', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpfulVotes: 1 } },
      { new: true }
    );
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json({ message: 'Thank you for your feedback', helpfulVotes: review.helpfulVotes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Report a review
router.post('/:id/report', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { reportedCount: 1 } },
      { new: true }
    );
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json({ message: 'Review reported. Thank you for helping us maintain quality.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's reviews
router.get('/my-reviews', authenticateToken, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id })
      .populate('carId', 'name image key')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user's review
router.put('/:id', authenticateToken, [
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('title').optional().notEmpty().withMessage('Review title cannot be empty'),
  body('comment').optional().notEmpty().withMessage('Review comment cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const review = await Review.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found or you are not authorized to edit it' });
    }

    const allowedUpdates = ['rating', 'title', 'comment', 'images'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Reset approval status if content changed
    if (updates.rating || updates.title || updates.comment) {
      updates.isApproved = false;
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json({
      message: 'Review updated successfully. It will be re-reviewed for approval.',
      review: updatedReview
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user's review
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found or you are not authorized to delete it' });
    }

    await Review.findByIdAndDelete(req.params.id);

    // Update car rating
    const carReviews = await Review.find({ carId: review.carId, isApproved: true });
    const avgRating = carReviews.length > 0 
      ? carReviews.reduce((sum, r) => sum + r.rating, 0) / carReviews.length 
      : 0;
    
    await Car.findByIdAndUpdate(review.carId, {
      'ratings.average': avgRating,
      'ratings.count': carReviews.length
    });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;