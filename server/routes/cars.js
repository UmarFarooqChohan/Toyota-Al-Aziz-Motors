const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const Review = require('../models/Review');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Advanced search and filtering
router.get('/', async (req, res) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      bodyType,
      fuelType,
      transmissionType,
      condition,
      availability,
      sortBy,
      sortOrder,
      page = 1,
      limit = 50
    } = req.query;

    // Build query
    let query = {};
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Price range
    if (minPrice || maxPrice) {
      query.priceNumeric = {};
      if (minPrice) query.priceNumeric.$gte = parseInt(minPrice);
      if (maxPrice) query.priceNumeric.$lte = parseInt(maxPrice);
    }
    
    // Filters
    if (bodyType) query.bodyType = bodyType;
    if (fuelType) query.fuelType = fuelType;
    if (transmissionType) query.transmissionType = transmissionType;
    if (condition) query.condition = condition;
    if (availability) query.availability = availability;

    // Sorting
    let sort = {};
    if (sortBy) {
      const order = sortOrder === 'desc' ? -1 : 1;
      sort[sortBy] = order;
    } else {
      sort = { createdAt: -1 }; // Default sort by newest
    }

    // Pagination
    const skip = (page - 1) * limit;
    
    const cars = await Car.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Car.countDocuments(query);
    
    res.json({
      cars,
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

// Get featured cars
router.get('/featured/list', async (req, res) => {
  try {
    const cars = await Car.find({ isFeatured: true, availability: 'available' })
      .sort({ views: -1 })
      .limit(6);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get popular cars
router.get('/popular/list', async (req, res) => {
  try {
    const cars = await Car.find({ availability: 'available' })
      .sort({ views: -1, 'ratings.average': -1 })
      .limit(8);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get car by key with view increment
router.get('/:key', async (req, res) => {
  try {
    const car = await Car.findOne({ key: req.params.key });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    // Increment view count
    await Car.findByIdAndUpdate(car._id, { $inc: { views: 1 } });
    
    // Get reviews for this car
    const reviews = await Review.find({ carId: car._id, isApproved: true })
      .populate('userId', 'name')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({ ...car.toObject(), reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get similar cars
router.get('/:key/similar', async (req, res) => {
  try {
    const car = await Car.findOne({ key: req.params.key });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    const similarCars = await Car.find({
      _id: { $ne: car._id },
      $or: [
        { bodyType: car.bodyType },
        { fuelType: car.fuelType },
        { 
          priceNumeric: { 
            $gte: car.priceNumeric * 0.8, 
            $lte: car.priceNumeric * 1.2 
          } 
        }
      ],
      availability: 'available'
    }).limit(4);
    
    res.json(similarCars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new car (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const carData = { ...req.body };
    
    // Convert price string to numeric for filtering
    if (carData.price) {
      const priceStr = carData.price.replace(/[^\d.]/g, '');
      carData.priceNumeric = parseFloat(priceStr) * (carData.price.includes('Cr') ? 10000000 : 100000);
    }
    
    const car = new Car(carData);
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update car (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const carData = { ...req.body };
    
    // Convert price string to numeric for filtering
    if (carData.price) {
      const priceStr = carData.price.replace(/[^\d.]/g, '');
      carData.priceNumeric = parseFloat(priceStr) * (carData.price.includes('Cr') ? 10000000 : 100000);
    }
    
    const car = await Car.findByIdAndUpdate(req.params.id, carData, { new: true });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete car (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update car availability
router.patch('/:id/availability', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { availability } = req.body;
    const car = await Car.findByIdAndUpdate(
      req.params.id, 
      { availability }, 
      { new: true }
    );
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
