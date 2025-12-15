# ⚡ Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites Check
```bash
# Check Node.js (need v14+)
node --version

# Check MongoDB (need v4.4+)
mongosh --version
```

### Installation (One-Time Setup)

#### Windows:
```bash
# Double-click or run:
install.bat
```

#### Mac/Linux:
```bash
# Install all dependencies
npm install
cd server && npm install
cd ../client && npm install

# Seed database
cd ../server && node seedData.js
```

### Start Application

#### Windows:
```bash
# Double-click or run:
start.bat
```

#### Mac/Linux:
```bash
# From root directory
npm run dev
```

### Access Application
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000/api/health

---

## 🔧 Common Commands

```bash
# Start both servers
npm run dev

# Start backend only
cd server && npm run dev

# Start frontend only
cd client && npm start

# Seed database
cd server && node seedData.js

# Install dependencies
npm run install-all
```

---

## 📁 Project Structure

```
Al-Aziz Motor House/
├── client/          # React frontend (port 3000)
├── server/          # Node.js backend (port 5000)
├── install.bat      # Windows installer
├── start.bat        # Windows starter
└── README.md        # Full documentation
```

---

## 🐛 Troubleshooting

### MongoDB not running?
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port already in use?
```bash
# Kill process on port 3000 or 5000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Dependencies issue?
```bash
# Reinstall everything
rm -rf node_modules package-lock.json
rm -rf client/node_modules client/package-lock.json
rm -rf server/node_modules server/package-lock.json
npm run install-all
```

---

## 📚 Documentation

- **Full Setup**: See `SETUP_GUIDE.md`
- **Project Details**: See `PROJECT_SUMMARY.md`
- **API Reference**: See `README.md`

---

## ✅ Success Checklist

- [ ] MongoDB is running
- [ ] Node.js is installed
- [ ] Dependencies installed (`install.bat` or `npm install`)
- [ ] Database seeded (`node seedData.js`)
- [ ] Servers started (`start.bat` or `npm run dev`)
- [ ] Frontend loads at http://localhost:3000
- [ ] Cars are visible on home page
- [ ] Forms submit successfully

---

## 🎯 What's Working

✅ Home page with car listings
✅ Search functionality
✅ Car comparison
✅ Booking form → MongoDB
✅ Contact form → MongoDB
✅ Car details page
✅ Responsive design
✅ WhatsApp button
✅ All original styling

---

## 📞 Need Help?

1. Check `SETUP_GUIDE.md` for detailed instructions
2. Review error messages in terminal
3. Verify MongoDB is running
4. Check all dependencies are installed
5. Contact: umar.farooq1592@gmail.com

---

## 🎉 You're All Set!

If you see the home page with cars loading, everything is working perfectly!

**Happy Coding! 🚗✨**
