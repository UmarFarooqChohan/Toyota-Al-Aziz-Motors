@echo off
echo ========================================
echo Al-Aziz Motor House - Quick Start
echo ========================================
echo.

echo Checking MongoDB...
mongosh --eval "db.version()" >nul 2>&1
if errorlevel 1 (
    echo [ERROR] MongoDB is not running!
    echo Please start MongoDB first.
    echo.
    echo Windows: net start MongoDB
    pause
    exit /b 1
)
echo [OK] MongoDB is running

echo.
echo Starting Backend Server...
start cmd /k "cd server && npm run dev"

timeout /t 3 >nul

echo Starting Frontend Server...
start cmd /k "cd client && npm start"

echo.
echo ========================================
echo Servers are starting...
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo ========================================
echo.
echo Press any key to exit this window...
pause >nul
