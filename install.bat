@echo off
echo ========================================
echo Al-Aziz Motor House - Installation
echo ========================================
echo.

echo [1/4] Installing root dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install root dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Installing server dependencies...
cd server
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install server dependencies
    pause
    exit /b 1
)

echo.
echo [3/4] Installing client dependencies...
cd ../client
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install client dependencies
    pause
    exit /b 1
)

echo.
echo [4/4] Seeding database...
cd ../server
call node seedData.js
if errorlevel 1 (
    echo [ERROR] Failed to seed database
    echo Make sure MongoDB is running!
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the application, run: start.bat
echo Or manually run: npm run dev
echo.
pause
