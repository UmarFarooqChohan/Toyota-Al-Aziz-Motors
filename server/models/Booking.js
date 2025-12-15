const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    required: false // Will be generated automatically
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  selectedCar: {
    type: String,
    required: true
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  bookingType: {
    type: String,
    enum: ['test-drive', 'appointment', 'inspection'],
    default: 'test-drive'
  },
  preferredDate: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) // Default to tomorrow
  },
  preferredTime: {
    type: String,
    default: '10:00 AM'
  },
  location: {
    type: String,
    default: 'Main Showroom - Lahore'
  },
  customerMessage: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
    default: 'pending'
  },
  confirmationSent: {
    type: Boolean,
    default: false
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  },
  assignedStaff: {
    type: String
  }
}, {
  timestamps: true
});

// Generate booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    this.bookingId = 'BK' + Date.now() + Math.floor(Math.random() * 1000);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
