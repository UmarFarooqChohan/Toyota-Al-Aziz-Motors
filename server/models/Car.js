const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  price: {
    type: String,
    required: true
  },
  priceNumeric: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  mileage: {
    type: String
  },
  bodyType: {
    type: String,
    enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van']
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG']
  },
  transmissionType: {
    type: String,
    enum: ['Manual', 'Automatic', 'CVT']
  },
  condition: {
    type: String,
    enum: ['New', 'Used', 'Certified Pre-Owned'],
    default: 'Used'
  },
  availability: {
    type: String,
    enum: ['available', 'sold', 'reserved', 'coming-soon'],
    default: 'available'
  },
  stockQuantity: {
    type: Number,
    default: 1
  },
  location: {
    type: String,
    default: 'Lahore'
  },
  features: [{
    type: String
  }],
  dimensions: [{
    type: String
  }],
  engine: [{
    type: String
  }],
  transmission: [{
    type: String
  }],
  steering: [{
    type: String
  }],
  suspension: [{
    type: String
  }],
  wheels: [{
    type: String
  }],
  fuel: [{
    type: String
  }],
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  views: {
    type: Number,
    default: 0
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for search optimization
carSchema.index({ name: 'text', bodyType: 1, fuelType: 1, transmissionType: 1 });
carSchema.index({ priceNumeric: 1 });
carSchema.index({ availability: 1 });

module.exports = mongoose.model('Car', carSchema);
