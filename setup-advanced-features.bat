@echo off
echo ========================================
echo Al-Aziz Motor House - Advanced Features Setup
echo ========================================
echo.

echo Installing server dependencies...
cd server
call npm install
echo.

echo Creating admin user...
node seedAdmin.js
echo.

echo Updating car database with new fields...
node seedData.js
echo.

echo Starting the server...
echo Server will start on http://localhost:5000
echo Admin Panel: http://localhost:5000/login.html (Select Admin Login)
echo.
echo Admin Credentials:
echo Email: umarfarooq@admin.com
echo Password: user123
echo.

start http://localhost:5000/login.html
npm start