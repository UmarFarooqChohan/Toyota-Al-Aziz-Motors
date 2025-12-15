# 🚀 Deployment Guide - Al-Aziz Motor House

## Vercel Deployment

### Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Create a Vercel account at [vercel.com](https://vercel.com)
3. Have your MongoDB connection string ready

### Environment Variables
Set these in your Vercel dashboard:

```
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Deploy Steps

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy from root directory**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables** (in Vercel dashboard)
   - Go to your project settings
   - Add the environment variables listed above

### Project Structure
```
├── client/          # React frontend
├── server/          # Node.js backend  
├── login.html       # Unified login page
├── admin-dashboard.html
├── user-dashboard.html
└── vercel.json      # Vercel configuration
```

### URLs After Deployment
- **Main Website**: `https://your-app.vercel.app`
- **Login**: `https://your-app.vercel.app/login.html`
- **Admin Dashboard**: `https://your-app.vercel.app/admin-dashboard.html`
- **User Dashboard**: `https://your-app.vercel.app/user-dashboard.html`
- **API**: `https://your-app.vercel.app/api/*`

### Features
✅ Unified login system (User + Admin)
✅ React frontend with routing
✅ Node.js backend API
✅ MongoDB database
✅ Responsive design
✅ Production-ready configuration

### Troubleshooting
- Check Vercel function logs for backend issues
- Ensure environment variables are set correctly
- MongoDB connection string must allow connections from anywhere (0.0.0.0/0)