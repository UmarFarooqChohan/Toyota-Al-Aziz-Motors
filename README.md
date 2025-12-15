# Al-Aziz Motor House - Toyota Showroom Website

A modern, full-stack web application for Al-Aziz Motor House, a Toyota car showroom in Pakistan. Built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **React Frontend**: Modern, responsive UI with React Router
- **MongoDB Backend**: RESTful API with Express.js
- **Car Catalog**: Browse all Toyota models with detailed specifications
- **Car Comparison**: Compare two cars side-by-side
- **Booking System**: Submit car booking requests
- **Contact Form**: Get in touch with the showroom
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Glassmorphism effects, smooth animations

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd "Al-Aziz Motor House"
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/alaziz-motor-house
NODE_ENV=development
```

### 4. Seed the database

```bash
cd server
node seedData.js
```

## 🚀 Running the Application

### Development Mode (Both servers)
```bash
# From root directory
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- React frontend on http://localhost:3000

### Run servers separately

**Backend only:**
```bash
cd server
npm run dev
```

**Frontend only:**
```bash
cd client
npm start
```

## 📁 Project Structure

```
Al-Aziz Motor House/
├── client/                 # React frontend
│   ├── public/
│   │   ├── IMG/           # All images
│   │   └── index.html
│   └── src/
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       ├── services/      # API services
│       └── App.js
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── server.js         # Express server
│   └── seedData.js       # Database seeder
└── package.json
```

## 🔌 API Endpoints

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:key` - Get car by key
- `POST /api/cars` - Create new car (admin)

### Bookings
- `POST /api/booking` - Submit booking request
- `GET /api/booking` - Get all bookings (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)

## 🎨 Technologies Used

### Frontend
- React 18
- React Router DOM
- Axios
- CSS3 (Modern features: Grid, Flexbox, Custom Properties)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

## 📱 Features Preserved from Original

All features from your original HTML/CSS/JS website have been preserved:
- ✅ All car models and specifications
- ✅ Search functionality
- ✅ Car comparison tool
- ✅ Booking form
- ✅ Contact form
- ✅ About section
- ✅ Founder section
- ✅ Social media links
- ✅ WhatsApp floating button
- ✅ All original styling and animations
- ✅ Responsive design

## 🔧 MongoDB Setup

If you don't have MongoDB installed:

**Windows:**
1. Download from https://www.mongodb.com/try/download/community
2. Install and run MongoDB as a service
3. MongoDB will run on `mongodb://localhost:27017`

**Mac (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## 📝 Adding More Cars

To add more cars to the database, edit `server/seedData.js` and add car objects to the `carsData` array, then run:

```bash
cd server
node seedData.js
```

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the 'build' folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy using platform CLI
```

### MongoDB (MongoDB Atlas)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Update MONGODB_URI in .env

## 👨‍💻 Developer

**Umar Farooq**
- YouTube: [@umarfarooq-rb2he](https://youtube.com/@umarfarooq-rb2he)
- Instagram: [@iam_umarfarooq](https://www.instagram.com/iam_umarfarooq)
- LinkedIn: [Umar Farooq](https://www.linkedin.com/in/umar-farooq-9769872b1)

## 📄 License

© 2025 Al-Aziz Motor House. All rights reserved.
