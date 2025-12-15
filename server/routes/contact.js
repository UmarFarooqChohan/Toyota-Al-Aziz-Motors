const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    res.status(201).json({ 
      success: true, 
      message: 'Thank you for your message! We will contact you soon.',
      data: savedContact 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error submitting form. Please try again.',
      error: error.message 
    });
  }
});

// Get all contacts (admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
