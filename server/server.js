const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve unified login page
app.get('/user-login.html', (req, res) => {
  console.log('Redirecting user-login.html to login.html');
  res.redirect('/login.html');
});

// Alternative login route
app.get('/login.html', (req, res) => {
  console.log('Serving login.html');
  const filePath = path.join(__dirname, '../login.html');
  console.log('File path:', filePath);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error serving login.html:', err);
      res.status(404).send('Login page not found');
    }
  });
});

// Add this route for /login (without .html extension)
app.get('/login', (req, res) => {
  console.log('Serving login page via /login route');
  const filePath = path.join(__dirname, '../login.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error serving login page:', err);
      res.status(404).send('Login page not found');
    }
  });
});


app.get('/user-dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../user-dashboard.html'));
});

// Test routes removed - files deleted during cleanup

app.get('/admin-login.html', (req, res) => {
  console.log('Redirecting admin-login.html to login.html');
  res.redirect('/login.html');
});

app.get('/admin-dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin-dashboard.html'));
});

// Serve static files from parent directory (AFTER specific routes)
app.use(express.static(path.join(__dirname, '../')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alaziz-motor-house';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  next();
});

// Routes
const carRoutes = require('./routes/cars');
const contactRoutes = require('./routes/contact');
const bookingRoutes = require('./routes/booking');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const reviewRoutes = require('./routes/reviews');

app.use('/api/cars', carRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Test route for debugging
app.get('/test', (req, res) => {
  res.send('<h1>Server is working!</h1><p>Static files should be served from: ' + path.join(__dirname, '../') + '</p>');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
