# 🚀 Complete Setup Guide - Al-Aziz Motor House

## Step-by-Step Installation Instructions

### Step 1: Install MongoDB

#### Windows:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install MongoDB as a Windows Service (check the box)
5. MongoDB will automatically start on port 27017

#### Mac:
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian):
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Step 2: Verify MongoDB Installation

```bash
# Check if MongoDB is running
mongosh

# You should see MongoDB shell
# Type 'exit' to quit
```

### Step 3: Install Node.js

Download and install Node.js from: https://nodejs.org/
- Choose LTS version (v18 or higher recommended)
- Verify installation:

```bash
node --version
npm --version
```

### Step 4: Install Project Dependencies

```bash
# Navigate to project root
cd "Al-Aziz Motor House"

# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Go back to root
cd ..
```

### Step 5: Seed the Database

```bash
# From root directory
cd server
node seedData.js
```

You should see:
```
✅ MongoDB Connected Successfully
Cleared existing car data
✅ Database seeded successfully with X cars
```

### Step 6: Start the Application

#### Option A: Run both servers together (Recommended)
```bash
# From root directory
npm run dev
```

#### Option B: Run servers separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Step 7: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use

**Error:** `Port 3000/5000 is already in use`

**Solution:**
```bash
# Windows - Kill process on port
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Reinstall dependencies
cd server
rm -rf node_modules package-lock.json
npm install

cd ../client
rm -rf node_modules package-lock.json
npm install
```

### Images Not Loading

**Solution:**
- Ensure the `IMG` folder is copied to `client/public/IMG`
- Check browser console for 404 errors
- Verify image paths start with `/IMG/`

## 📝 Environment Variables

Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/alaziz-motor-house
NODE_ENV=development
```

## 🧪 Testing the API

### Using Browser:
- http://localhost:5000/api/cars
- http://localhost:5000/api/cars/passo

### Using curl:
```bash
# Get all cars
curl http://localhost:5000/api/cars

# Get specific car
curl http://localhost:5000/api/cars/passo

# Submit booking
curl -X POST http://localhost:5000/api/booking \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test","customerEmail":"test@test.com","customerPhone":"03001234567","selectedCar":"Toyota Passo"}'
```

## 🌐 Production Deployment

### Frontend (Vercel)
```bash
cd client
npm run build

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Backend (Railway/Heroku)
```bash
cd server

# Create Procfile
echo "web: node server.js" > Procfile

# Deploy using platform CLI
```

### MongoDB Atlas (Cloud Database)
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in production environment

## 📱 Features Checklist

- ✅ Home page with car listings
- ✅ Search functionality
- ✅ Car comparison tool
- ✅ Booking form with MongoDB storage
- ✅ Contact form with MongoDB storage
- ✅ Car details page with specifications
- ✅ Responsive design
- ✅ WhatsApp integration
- ✅ Social media links
- ✅ About section
- ✅ Google Maps integration

## 🎯 Next Steps

1. Add authentication for admin panel
2. Create admin dashboard to view bookings/contacts
3. Add email notifications
4. Implement image upload for cars
5. Add more car models
6. Implement search filters
7. Add user reviews/testimonials

## 💡 Tips

- Use MongoDB Compass for visual database management
- Use Postman for API testing
- Check browser DevTools console for errors
- Monitor MongoDB logs for database issues
- Use React DevTools for component debugging

## 📞 Support

If you encounter any issues:
1. Check this guide first
2. Review error messages carefully
3. Check MongoDB and Node.js are running
4. Verify all dependencies are installed
5. Contact: umar.farooq1592@gmail.com

## 🎉 Success!

If everything is working:
- You should see the home page at http://localhost:3000
- Cars should load from MongoDB
- Forms should submit successfully
- Navigation should work smoothly

Congratulations! Your Al-Aziz Motor House website is now running with React and MongoDB! 🚗✨
