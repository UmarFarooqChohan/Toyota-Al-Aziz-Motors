# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                     http://localhost:3000                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP Requests
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    REACT FRONTEND                            │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Home     │  │   Car      │  │  Contact   │           │
│  │   Page     │  │  Details   │  │   Page     │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│                                                              │
│  ┌────────────────────────────────────────────┐            │
│  │         Components Layer                    │            │
│  │  - Header  - Footer  - WhatsAppButton      │            │
│  └────────────────────────────────────────────┘            │
│                                                              │
│  ┌────────────────────────────────────────────┐            │
│  │         Services Layer (API)                │            │
│  │  - carService  - bookingService             │            │
│  │  - contactService                           │            │
│  └────────────────────────────────────────────┘            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Axios HTTP Requests
                           │ (GET, POST)
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                  EXPRESS.JS BACKEND                          │
│                  http://localhost:5000                       │
│                                                              │
│  ┌────────────────────────────────────────────┐            │
│  │         API Routes                          │            │
│  │  /api/cars       - Car endpoints            │            │
│  │  /api/booking    - Booking endpoints        │            │
│  │  /api/contact    - Contact endpoints        │            │
│  └────────────────────────────────────────────┘            │
│                                                              │
│  ┌────────────────────────────────────────────┐            │
│  │         Mongoose Models                     │            │
│  │  - Car Model                                │            │
│  │  - Booking Model                            │            │
│  │  - Contact Model                            │            │
│  └────────────────────────────────────────────┘            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ MongoDB Driver
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    MONGODB DATABASE                          │
│                mongodb://localhost:27017                     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    cars      │  │   bookings   │  │   contacts   │     │
│  │  collection  │  │  collection  │  │  collection  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Viewing Cars (GET Request)

```
User Opens Home Page
        ↓
React Component (Home.js)
        ↓
carService.getAllCars()
        ↓
Axios GET /api/cars
        ↓
Express Route (routes/cars.js)
        ↓
Car.find() - Mongoose Query
        ↓
MongoDB Database
        ↓
Returns Car Documents
        ↓
Express sends JSON Response
        ↓
React Updates State
        ↓
UI Renders Car List
```

### 2. Booking a Car (POST Request)

```
User Fills Booking Form
        ↓
React Component (Home.js)
        ↓
bookingService.submitBooking(data)
        ↓
Axios POST /api/booking
        ↓
Express Route (routes/booking.js)
        ↓
new Booking(data).save()
        ↓
MongoDB Saves Document
        ↓
Returns Saved Booking
        ↓
Express sends Success Response
        ↓
React Shows Success Message
        ↓
Form Resets
```

### 3. Viewing Car Details

```
User Clicks Car Card
        ↓
React Router Navigation
        ↓
CarDetails Component Loads
        ↓
carService.getCarByKey(key)
        ↓
Axios GET /api/cars/:key
        ↓
Express Route
        ↓
Car.findOne({ key: key })
        ↓
MongoDB Query
        ↓
Returns Car Document
        ↓
React Renders Details
```

## Component Hierarchy

```
App.js
├── Router
    ├── Route: /
    │   └── Home.js
    │       ├── Header
    │       ├── Hero Section
    │       ├── Car List (from MongoDB)
    │       ├── Compare Section
    │       ├── Booking Form
    │       ├── About Section
    │       ├── Footer
    │       └── WhatsAppButton
    │
    ├── Route: /car-details/:carKey
    │   └── CarDetails.js
    │       ├── Header
    │       ├── Car Header (Image, Price)
    │       ├── Quick Stats
    │       ├── Specifications Tabs
    │       ├── Contact Section
    │       ├── Footer
    │       └── WhatsAppButton
    │
    └── Route: /contact
        └── Contact.js
            ├── Header
            ├── Hero Section
            ├── Contact Form
            ├── Contact Info
            ├── Map Section
            ├── Footer
            └── WhatsAppButton
```

## API Endpoints

### Cars API
```
GET    /api/cars           → Get all cars
GET    /api/cars/:key      → Get specific car
POST   /api/cars           → Create car (admin)
```

### Booking API
```
POST   /api/booking        → Submit booking
GET    /api/booking        → Get all bookings (admin)
```

### Contact API
```
POST   /api/contact        → Submit contact form
GET    /api/contact        → Get all contacts (admin)
```

## Database Schema

### Car Collection
```javascript
{
  _id: ObjectId,
  key: "passo",
  name: "Toyota Passo",
  image: "IMG/Toyota_Passo.jpg",
  price: "PKR 32.0 - 43.0 lacs",
  dimensions: [...],
  engine: [...],
  transmission: [...],
  steering: [...],
  suspension: [...],
  wheels: [...],
  fuel: [...],
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Collection
```javascript
{
  _id: ObjectId,
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "03001234567",
  selectedCar: "Toyota Passo",
  customerMessage: "Interested in this car",
  status: "pending",
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Collection
```javascript
{
  _id: ObjectId,
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "03001234567",
  subject: "car-inquiry",
  interestedCar: "Toyota Yaris",
  message: "Need more information",
  status: "new",
  createdAt: Date,
  updatedAt: Date
}
```

## Technology Stack

### Frontend
```
React 18.2.0
├── React Router DOM 6.20.1  (Routing)
├── Axios 1.6.2              (HTTP Client)
└── CSS3                     (Styling)
```

### Backend
```
Node.js
├── Express 4.18.2           (Web Framework)
├── Mongoose 8.0.3           (MongoDB ODM)
├── CORS 2.8.5               (Cross-Origin)
└── dotenv 16.3.1            (Environment)
```

### Database
```
MongoDB 6.0+
└── Collections: cars, bookings, contacts
```

## File Structure

```
Al-Aziz Motor House/
│
├── client/                    # React Frontend
│   ├── public/
│   │   ├── IMG/              # All images
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── WhatsAppButton.js
│   │   ├── pages/            # Page components
│   │   │   ├── Home.js
│   │   │   ├── CarDetails.js
│   │   │   └── Contact.js
│   │   ├── services/         # API services
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                    # Node.js Backend
│   ├── models/               # Mongoose models
│   │   ├── Car.js
│   │   ├── Booking.js
│   │   └── Contact.js
│   ├── routes/               # Express routes
│   │   ├── cars.js
│   │   ├── booking.js
│   │   └── contact.js
│   ├── server.js             # Main server file
│   ├── seedData.js           # Database seeder
│   ├── .env                  # Environment variables
│   └── package.json
│
├── package.json              # Root package.json
├── README.md                 # Main documentation
├── SETUP_GUIDE.md           # Setup instructions
├── QUICK_START.md           # Quick reference
├── PROJECT_SUMMARY.md       # Project overview
├── ARCHITECTURE.md          # This file
├── install.bat              # Windows installer
└── start.bat                # Windows starter
```

## Security Considerations

### Current Implementation
- ✅ CORS enabled for cross-origin requests
- ✅ Environment variables for sensitive data
- ✅ Input validation on forms
- ✅ MongoDB injection protection (Mongoose)

### Future Enhancements
- 🔒 Add authentication (JWT)
- 🔒 Add rate limiting
- 🔒 Add input sanitization
- 🔒 Add HTTPS in production
- 🔒 Add admin authorization

## Performance Optimizations

### Current
- ✅ React lazy loading (can be added)
- ✅ Image lazy loading
- ✅ CSS animations with GPU acceleration
- ✅ Efficient MongoDB queries

### Future
- ⚡ Add Redis caching
- ⚡ Implement CDN for images
- ⚡ Add service workers
- ⚡ Implement code splitting
- ⚡ Add image optimization

## Deployment Architecture

```
Production Environment:

Frontend (Vercel/Netlify)
        ↓
Backend (Railway/Heroku)
        ↓
MongoDB Atlas (Cloud)
```

---

**This architecture provides a solid foundation for a scalable, maintainable web application!**
