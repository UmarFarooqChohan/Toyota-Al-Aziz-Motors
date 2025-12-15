const mongoose = require('mongoose');
const Car = require('./models/Car');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alaziz-motor-house';

// Helper function to extract numeric price
function extractPrice(priceString) {
  const match = priceString.match(/(\d+\.?\d*)/g);
  if (match) {
    const price = parseFloat(match[0]);
    if (priceString.includes('Crore') || priceString.includes('Cr')) {
      return price * 10000000; // Convert crores to PKR
    } else if (priceString.includes('lacs') || priceString.includes('lac')) {
      return price * 100000; // Convert lacs to PKR
    }
  }
  return 3000000; // Default price
}

const carsData = [
  {
    key: "passo",
    name: "Toyota Passo",
    image: "IMG/Toyota_Passo.jpg",
    price: "PKR 32.0 - 43.0 lacs",
    priceNumeric: 3750000,
    year: 2023,
    mileage: "24-28 KM/L",
    bodyType: "Hatchback",
    fuelType: "Petrol",
    transmissionType: "Automatic",
    condition: "Used",
    availability: "available",
    stockQuantity: 3,
    features: ["Air Conditioning", "Power Steering", "Central Locking", "Electric Windows"],
    dimensions: [
      "Overall Length: 3650 mm",
      "Overall Width: 1665 mm",
      "Overall Height: 1525 mm",
      "Wheel Base: 2490 mm",
      "Ground Clearance: 150 mm",
      "Kerb Weight: 910 KG",
      "Seating Capacity: 5 persons",
      "No. of Doors: 5"
    ],
    engine: [
      "Engine Type: Petrol",
      "Displacement: 996 cc",
      "No. of Cylinders: 3",
      "Drive Train: FWD",
      "Horse Power: 68 HP @ 6000 RPM",
      "Torque: 92 Nm @ 4400 RPM",
      "Max Speed: 180 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic (CVT)",
      "Gearbox: 1-speed"
    ],
    steering: [
      "Steering Type: Rack & Pinion",
      "Power Assisted: Electric",
      "Minimum Turning Radius: 4.6m"
    ],
    suspension: [
      "Front Suspension: McPherson Strut Coil Springs",
      "Rear Suspension: Torsion Beam with Coil Springs",
      "Front Brakes: Solid Disc",
      "Rear Brakes: Drum"
    ],
    wheels: [
      "Wheel Type: Steel Wheels with Wheel Caps",
      "Tyre Size: 165/65/R14",
      "Wheel Size: 14 in",
      "Spare Tyre PCD: 4 x 100mm"
    ],
    fuel: [
      "Mileage City: 24 KM/L",
      "Mileage Highway: 28 KM/L",
      "Fuel Tank Capacity: 38 L"
    ]
  },
  {
    key: "vitz",
    name: "Toyota Vitz",
    image: "IMG/Toyota_Vitz_Front_Right_Angled.jpg",
    price: "PKR 32.0 - 43.0 lacs",
    priceNumeric: 3750000,
    year: 2022,
    mileage: "16-22 KM/L",
    bodyType: "Hatchback",
    fuelType: "Petrol",
    transmissionType: "Automatic",
    condition: "Used",
    availability: "available",
    stockQuantity: 2,
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags"],
    dimensions: [
      "Overall Length: 3945 mm",
      "Overall Width: 1695 mm",
      "Overall Height: 1500 mm",
      "Wheel Base: 2510 mm",
      "Ground Clearance: 140 mm",
      "Kerb Weight: 970 KG",
      "Seating Capacity: 5 persons",
      "No. of Doors: 5"
    ],
    engine: [
      "Engine Type: Petrol",
      "Displacement: 996 - 1496 cc",
      "No. of Cylinders: 3 - 4",
      "Drive Train: FWD",
      "Horse Power: 69 - 106 HP",
      "Torque: 92 - 140 Nm",
      "Max Speed: 180 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic (CVT) / Manual",
      "Gearbox: 5-speed / 7-speed"
    ],
    steering: [
      "Steering Type: Electric Power Steering",
      "Minimum Turning Radius: 4.5m"
    ],
    suspension: [
      "Front Suspension: McPherson Strut Coil Springs",
      "Rear Suspension: Torsion Beam with Coil Springs",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Drum"
    ],
    wheels: [
      "Wheel Type: Steel / Alloy Wheels",
      "Tyre Size: 165/70/R14 - 185/60/R15",
      "Wheel Size: 14 - 15 in",
      "Spare Tyre PCD: 4 x 100mm"
    ],
    fuel: [
      "Mileage City: 16 - 18 KM/L",
      "Mileage Highway: 20 - 22 KM/L",
      "Fuel Tank Capacity: 42 L"
    ]
  },
  {
    key: "yaris",
    name: "Toyota Yaris",
    image: "IMG/Yaris.jpg",
    price: "PKR 42.9 - 49.9 lacs",
    priceNumeric: 4640000,
    year: 2024,
    mileage: "14-20 KM/L",
    bodyType: "Sedan",
    fuelType: "Petrol",
    transmissionType: "Automatic",
    condition: "New",
    availability: "available",
    stockQuantity: 4,
    isPopular: true,
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "Multimedia System"],
    dimensions: [
      "Overall Length: 4425 mm",
      "Overall Width: 1730 mm",
      "Overall Height: 1475 mm",
      "Wheel Base: 2550 mm",
      "Ground Clearance: 135 mm",
      "Kerb Weight: 1050 KG",
      "Seating Capacity: 5 persons",
      "No. of Doors: 4"
    ],
    engine: [
      "Engine Type: Petrol",
      "Displacement: 1329 cc",
      "No. of Cylinders: 4",
      "Drive Train: FWD",
      "Horse Power: 92 HP @ 6000 RPM",
      "Torque: 121 Nm @ 4400 RPM",
      "Max Speed: 180 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic (CVT) / Manual",
      "Gearbox: 5-speed / 7-speed"
    ],
    steering: [
      "Steering Type: Electric Power Steering",
      "Minimum Turning Radius: 5.0m"
    ],
    suspension: [
      "Front Suspension: McPherson Strut",
      "Rear Suspension: Torsion Beam",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Drum"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 185/60/R15",
      "Wheel Size: 15 in"
    ],
    fuel: [
      "Mileage City: 14 - 16 KM/L",
      "Mileage Highway: 18 - 20 KM/L",
      "Fuel Tank Capacity: 42 L"
    ]
  },
  {
    key: "corolla",
    name: "Toyota Corolla",
    image: "IMG/Corolla.jpg",
    price: "PKR 59.9 - 75.5 lacs",
    priceNumeric: 6770000,
    year: 2024,
    mileage: "11-17 KM/L",
    bodyType: "Sedan",
    fuelType: "Petrol",
    transmissionType: "Automatic",
    condition: "New",
    availability: "available",
    stockQuantity: 5,
    isPopular: true,
    isFeatured: true,
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "Alloy Wheels", "Multimedia System"],
    dimensions: [
      "Overall Length: 4630 mm",
      "Overall Width: 1780 mm",
      "Overall Height: 1435 mm",
      "Wheel Base: 2700 mm",
      "Ground Clearance: 135 mm",
      "Kerb Weight: 1270 KG",
      "Seating Capacity: 5 persons",
      "No. of Doors: 4"
    ],
    engine: [
      "Engine Type: Petrol",
      "Displacement: 1298 - 1798 cc",
      "No. of Cylinders: 4",
      "Drive Train: FWD",
      "Horse Power: 84 - 138 HP",
      "Torque: 121 - 173 Nm",
      "Max Speed: 180 - 200 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic (CVT) / Manual",
      "Gearbox: 6-speed"
    ],
    steering: [
      "Steering Type: Electric Power Steering",
      "Minimum Turning Radius: 5.4m"
    ],
    suspension: [
      "Front Suspension: McPherson Strut",
      "Rear Suspension: Torsion Beam",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Solid Disc"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 195/65/R15 - 205/55/R16",
      "Wheel Size: 15 - 16 in"
    ],
    fuel: [
      "Mileage City: 11 - 13 KM/L",
      "Mileage Highway: 15 - 17 KM/L",
      "Fuel Tank Capacity: 50 L"
    ]
  }
];

// Add required fields to remaining cars
const remainingCars = [
  { key: "axio", price: "PKR 55.0 - 65.0 lacs", bodyType: "Sedan", fuelType: "Hybrid", transmissionType: "Automatic" },
  { key: "camry", price: "PKR 1.2 - 1.5 Crore", bodyType: "Sedan", fuelType: "Hybrid", transmissionType: "Automatic" },
  { key: "aqua", price: "PKR 55.0 - 70.0 lacs", bodyType: "Hatchback", fuelType: "Hybrid", transmissionType: "Automatic" },
  { key: "raize", price: "PKR 65.0 - 75.0 lacs", bodyType: "SUV", fuelType: "Petrol", transmissionType: "Automatic" },
  { key: "chr", price: "PKR 95.0 - 1.1 Crore", bodyType: "SUV", fuelType: "Hybrid", transmissionType: "Automatic" },
  { key: "corolla-cross", price: "PKR 85.0 - 95.0 lacs", bodyType: "SUV", fuelType: "Petrol", transmissionType: "Automatic" },
  { key: "fortuner", price: "PKR 1.45 - 1.75 Crore", bodyType: "SUV", fuelType: "Diesel", transmissionType: "Automatic" },
  { key: "prado", price: "PKR 2.0 - 2.5 Crore", bodyType: "SUV", fuelType: "Diesel", transmissionType: "Automatic" },
  { key: "land-cruiser", price: "PKR 10.0 - 12.0 Crore", bodyType: "SUV", fuelType: "Diesel", transmissionType: "Automatic" },
  { key: "surf", price: "PKR 1.2 - 1.5 Crore", bodyType: "SUV", fuelType: "Diesel", transmissionType: "Manual" },
  { key: "revo", price: "PKR 1.0 - 1.4 Crore", bodyType: "Pickup", fuelType: "Diesel", transmissionType: "Manual" },
  { key: "hiace", price: "PKR 90.0 lacs - 1.2 Crore", bodyType: "Van", fuelType: "Diesel", transmissionType: "Manual" }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Car.deleteMany({});
    console.log('Cleared existing car data');
    
    // Process each car and add required fields
    const processedCars = carsData.map(car => ({
      ...car,
      priceNumeric: car.priceNumeric || extractPrice(car.price)
    }));
    
    // Insert new data
    await Car.insertMany(processedCars);
    console.log('✅ Database seeded successfully with', processedCars.length, 'cars');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();