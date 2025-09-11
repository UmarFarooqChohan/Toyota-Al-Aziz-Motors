// Al-Aziz Motor House - Main JavaScript File
document.addEventListener("DOMContentLoaded", function () {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar ul");
    
    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function () {
            navbar.classList.toggle("active");
        });
    }

    // Search Functionality
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            let filter = this.value.toLowerCase();
            document.querySelectorAll(".car-item").forEach(car => {
                let carName = car.getAttribute("data-name").toLowerCase();
                car.style.display = carName.includes(filter) ? "block" : "none";
            });
        });
    }

    // Booking Form Handler
    const bookingForm = document.getElementById("booking-form");
    if (bookingForm) {
        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let name = document.getElementById("customer-name").value.trim();
            let email = document.getElementById("customer-email").value.trim();
            let phone = document.getElementById("customer-phone").value.trim();
            let carModel = document.getElementById("selected-car").value;
            let message = document.getElementById("customer-message").value.trim();

            // Form validation
            if (name === "" || email === "" || phone === "" || carModel === "") {
                alert("Please fill in all required fields.");
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Phone validation (basic Pakistani number format)
            const phoneRegex = /^(\+92|0)?[3][0-9]{9}$/;
            if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
                alert("Please enter a valid Pakistani phone number.");
                return;
            }

            // Success message with booking details
            let successMessage = `Thank you, ${name}! Your booking request for ${carModel} has been received.\n\n`;
            successMessage += `Booking Details:\n`;
            successMessage += `Name: ${name}\n`;
            successMessage += `Email: ${email}\n`;
            successMessage += `Phone: ${phone}\n`;
            successMessage += `Car Model: ${carModel}\n`;
            if (message) {
                successMessage += `Message: ${message}\n`;
            }
            successMessage += `\nWe will contact you within 24 hours to confirm your booking.`;
            
            alert(successMessage);

            // Reset form
            bookingForm.reset();
        });
    }
});

// Car Data - Updated with consistent naming
let carData = {
    "Toyota Passo": {
        "price": "PKR 32.0 - 35.2 lacs",
        "img": "IMG/Toyota_Passo.jpg",
        "engine": "1.0L Petrol",
        "fuel": "18-25 km/l",
        "transmission": "Automatic (CVT)",
        "seating": "5-Seater",
        "horsepower": "69 HP"
    },
    "Toyota Vitz": {
        "price": "PKR 32.0 - 43.0 lacs",
        "img": "IMG/Toyota_Vitz_Front_Right_Angled.jpg",
        "engine": "1.0L / 1.3L / 1.5L Petrol",
        "fuel": "15-20 km/l",
        "transmission": "Automatic (CVT)",
        "seating": "5-Seater",
        "horsepower": "69-106 HP"
    },
    "Toyota Corolla Axio": {
        "price": "PKR 37.4 - 65.0 lacs",
        "img": "IMG/Toyota_Corolla_Axio_11th.jpg",
        "engine": "1.3L / 1.5L / 1.8L Petrol",
        "fuel": "14-22 km/l",
        "transmission": "Automatic (CVT)",
        "seating": "5-Seater",
        "horsepower": "95-140 HP"
    },
    "Toyota Yaris": {
        "price": "PKR 4,299,000",
        "img": "IMG/yaris.jpg",
        "engine": "1.3L / 1.5L Petrol",
        "fuel": "14-18 km/l",
        "transmission": "Automatic (CVT) / Manual",
        "seating": "5-Seater",
        "horsepower": "98-106 HP"
    },
    "Toyota Yaris Hatchback": {
        "price": "PKR 42.0 - 65.2 lacs",
        "img": "IMG/yaris-red-edited.jpg",
        "engine": "1.0L / 1.5L Petrol",
        "fuel": "16-22 km/l",
        "transmission": "Automatic (CVT)",
        "seating": "5-Seater",
        "horsepower": "69-106 HP"
    },
    "Toyota Raize": {
        "price": "PKR 48.9 - 68.6 lacs",
        "img": "IMG/Raize.jpg",
        "engine": "1.0L Turbo / 1.2L Petrol",
        "fuel": "18-22 km/l",
        "transmission": "Automatic (CVT)",
        "seating": "5-Seater",
        "horsepower": "98-106 HP"
    },
    "Toyota C-HR": {
        "price": "PKR 58.5 - 95.0 lacs",
        "img": "IMG/C-HR-(cover-photo)..jpg",
        "engine": "1.8L Hybrid / 1.2L Turbo",
        "fuel": "18-26 km/l",
        "transmission": "Automatic (CVT)",
        "seating": "5-Seater",
        "horsepower": "98-120 HP"
    },
    "Toyota Corolla": {
        "price": "PKR 59.7 - 75.5 lacs",
        "img": "IMG/corolla.jpg",
        "engine": "1.6L / 1.8L Petrol",
        "fuel": "12-16 km/l",
        "transmission": "Automatic (CVT) / Manual",
        "seating": "5-Seater",
        "horsepower": "120-138 HP"
    },
    "Toyota Surf": {
        "price": "PKR 66.4 - 97.6 lacs",
        "img": "IMG/surf_new.jpg",
        "engine": "2.7L / 3.0L Diesel / 4.0L Petrol",
        "fuel": "8-12 km/l",
        "transmission": "Automatic / Manual",
        "seating": "5-Seater",
        "horsepower": "150-270 HP"
    },
    "Toyota Aqua": {
        "price": "PKR 68.5 lacs",
        "img": "IMG/Aqua.jpg",
        "engine": "1.5L Hybrid",
        "fuel": "25-30 km/l",
        "transmission": "Automatic (CVT)",
        "seating": "5-Seater",
        "horsepower": "98 HP"
    },
    "Toyota Corolla Cross": {
        "price": "PKR 76.9 lacs - 1.31 crore",
        "img": "IMG/Corolla_Cross_JDM.png",
        "engine": "1.8L Hybrid",
        "fuel": "18-24 km/l",
        "transmission": "Automatic (CVT)",
        "seating": "5-Seater",
        "horsepower": "120 HP"
    },
    "Toyota Hiace": {
        "price": "PKR 1.31 - 2.1 crore",
        "img": "IMG/hiace-cover.jpg",
        "engine": "2.8L Diesel",
        "fuel": "10-12 km/l",
        "transmission": "Automatic / Manual",
        "seating": "10-15 Seater",
        "horsepower": "154 HP"
    },
    "Toyota Hilux": {
        "price": "PKR 10,979,000",
        "img": "IMG/Revo_-_PNG.png",
        "engine": "2.8L Diesel",
        "fuel": "9-12 km/l",
        "transmission": "Automatic / Manual",
        "seating": "5-Seater",
        "horsepower": "201 HP"
    },
    "Toyota Camry": {
        "price": "PKR 3 crore",
        "img": "IMG/Toyota_Camry_Front.jpg",
        "engine": "2.5L Hybrid",
        "fuel": "18-22 km/l",
        "transmission": "Automatic (CVT)",
        "seating": "5-Seater",
        "horsepower": "176 HP"
    },
    "Toyota Prado": {
        "price": "PKR 6.66 - 7.56 crore",
        "img": "IMG/PRADO.jpg",
        "engine": "2.8L Diesel / 4.0L Petrol",
        "fuel": "7-12 km/l",
        "transmission": "Automatic / Manual",
        "seating": "7-Seater",
        "horsepower": "201-271 HP"
    }
};

// Compare Cars Function
function compareCars() {
    let car1 = document.getElementById("car1").value;
    let car2 = document.getElementById("car2").value;
    
    // Input validation
    if (car1 === "" || car2 === "") {
        alert("Please select two cars to compare.");
        return;
    }
    
    if (car1 === car2) {
        alert("Please select two different cars.");
        return;
    }
    
    let car1Data = carData[car1];
    let car2Data = carData[car2];

    // Check if car data exists
    if (!car1Data || !car2Data) {
        alert("Car data not found. Please check your selection.");
        return;
    }

    // Generate comparison HTML
    let resultHTML = `
        <div class="comparison-container">
            <div class="car-comparison">
                <img src="${car1Data.img}" alt="${car1}" onerror="this.src='https://via.placeholder.com/300x200/f0f0f0/333?text=Image+Not+Found'">
                <h3>${car1}</h3>
                <div class="comparison-details">
                    <p><strong>Price:</strong> ${car1Data.price}</p>
                    <p><strong>Engine:</strong> ${car1Data.engine}</p>
                    <p><strong>Fuel Efficiency:</strong> ${car1Data.fuel}</p>
                    <p><strong>Transmission:</strong> ${car1Data.transmission}</p>
                    <p><strong>Seating Capacity:</strong> ${car1Data.seating}</p>
                    <p><strong>Horsepower:</strong> ${car1Data.horsepower}</p>
                </div>
                <div class="comparison-actions">
                    <button onclick="openCarDetails('${getCarKey(car1)}')" class="btn-details">View Details</button>
                    <button onclick="bookCar('${car1}')" class="btn-book">Book Now</button>
                </div>
            </div>
            
            <div class="vs">VS</div>
            
            <div class="car-comparison">
                <img src="${car2Data.img}" alt="${car2}" onerror="this.src='https://via.placeholder.com/300x200/f0f0f0/333?text=Image+Not+Found'">
                <h3>${car2}</h3>
                <div class="comparison-details">
                    <p><strong>Price:</strong> ${car2Data.price}</p>
                    <p><strong>Engine:</strong> ${car2Data.engine}</p>
                    <p><strong>Fuel Efficiency:</strong> ${car2Data.fuel}</p>
                    <p><strong>Transmission:</strong> ${car2Data.transmission}</p>
                    <p><strong>Seating Capacity:</strong> ${car2Data.seating}</p>
                    <p><strong>Horsepower:</strong> ${car2Data.horsepower}</p>
                </div>
                <div class="comparison-actions">
                    <button onclick="openCarDetails('${getCarKey(car2)}')" class="btn-details">View Details</button>
                    <button onclick="bookCar('${car2}')" class="btn-book">Book Now</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById("comparison-result").innerHTML = resultHTML;
    
    // Scroll to results
    document.getElementById("comparison-result").scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
    });
}

// Helper function to get car key for details page
function getCarKey(carName) {
    const carKeyMap = {
        "Toyota Passo": "passo",
        "Toyota Vitz": "vitz",
        "Toyota Corolla Axio": "corolla_axio",
        "Toyota Yaris": "yaris",
        "Toyota Yaris Hatchback": "yaris_hatchback",
        "Toyota Raize": "raize",
        "Toyota C-HR": "chr",
        "Toyota Corolla": "corolla",
        "Toyota Surf": "surf",
        "Toyota Aqua": "aqua",
        "Toyota Corolla Cross": "corolla_cross",
        "Toyota Hiace": "hiace",
        "Toyota Hilux": "hilux",
        "Toyota Camry": "camry",
        "Toyota Prado": "prado"
    };
    return carKeyMap[carName] || carName.toLowerCase().replace(/\s+/g, '_');
}

// Open Car Details Function
function openCarDetails(carKey) {
    try {
        // Open car details in new window
        window.open(`car-details.html?car=${carKey}`, '_blank');
    } catch (error) {
        console.error('Error opening car details:', error);
        alert('Unable to open car details. Please try again.');
    }
}

// Book Car Function (for comparison buttons)
function bookCar(carName) {
    try {
        // Scroll to booking section
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start' 
            });
            
            // Pre-select the car in booking form
            setTimeout(() => {
                const carSelect = document.getElementById('selected-car');
                if (carSelect) {
                    carSelect.value = carName;
                    carSelect.focus();
                }
            }, 500);
        } else {
            // Fallback: redirect to home page booking section
            window.location.href = 'home.html#booking';
        }
    } catch (error) {
        console.error('Error navigating to booking:', error);
        window.location.href = 'home.html#booking';
    }
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navbar = document.querySelector('.navbar ul');
                if (navbar && navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                }
            }
        });
    });
});

// Image Error Handling
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Fallback for broken images
            if (!this.dataset.fallbackSet) {
                this.src = 'https://via.placeholder.com/300x200/f0f0f0/333?text=Image+Not+Available';
                this.dataset.fallbackSet = 'true';
            }
        });
    });
});

// Form Validation Utilities
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    // Pakistani phone number validation
    const phoneRegex = /^(\+92|0)?[3][0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Loading Animation for Car Details
function showLoading() {
    const loadingHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading car details...</p>
        </div>
    `;
    return loadingHTML;
}

// Error Handling for Car Details
function showError(message = "Car details not found") {
    const errorHTML = `
        <div class="error-container">
            <div class="error-content">
                <h2>Oops! Something went wrong</h2>
                <p>${message}</p>
                <div class="error-actions">
                    <button onclick="window.close()" class="btn-secondary">Close</button>
                    <a href="home.html" class="btn-primary">Back to Home</a>
                </div>
            </div>
        </div>
    `;
    return errorHTML;
}

// Analytics and Tracking (placeholder)
function trackEvent(eventName, carName = null) {
    try {
        // Placeholder for analytics tracking
        console.log(`Event: ${eventName}`, carName ? `Car: ${carName}` : '');
        
        // You can integrate with Google Analytics, Facebook Pixel, etc.
        // Example: gtag('event', eventName, { 'car_name': carName });
    } catch (error) {
        console.error('Tracking error:', error);
    }
}

// Track car comparison
function trackComparison(car1, car2) {
    trackEvent('compare_cars', `${car1} vs ${car2}`);
}

// Track car details view
function trackCarView(carName) {
    trackEvent('view_car_details', carName);
}

// Track booking attempt
function trackBooking(carName) {
    trackEvent('booking_attempt', carName);
}

// Initialize tracking on page load
document.addEventListener('DOMContentLoaded', function() {
    trackEvent('page_load', window.location.pathname);
});