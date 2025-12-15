const mongoose = require('mongoose');
const Car = require('./models/Car');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alaziz-motor-house';

const carsData = [
  {
    key: "passo",
    name: "Toyota Passo",
    image: "IMG/Toyota_Passo.jpg",
    price: "PKR 32.0 - 43.0 lacs",
    priceNumeric: 3750000, // Average price in PKR
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
    year: 2023,
    mileage: "14-20 KM/L",
    bodyType: "Sedan",
    fuelType: "Petrol",
    transmissionType: "Automatic",
    condition: "New",
    availability: "available",
    stockQuantity: 4,
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "Alloy Wheels"],
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
  },
  {
    key: "axio",
    name: "Toyota Corolla Axio",
    image: "IMG/Toyota_Corolla_Axio_11th.jpg",
    price: "PKR 55.0 - 65.0 lacs",
    priceNumeric: 6000000,
    year: 2022,
    mileage: "14-25 KM/L",
    bodyType: "Sedan",
    fuelType: "Hybrid",
    transmissionType: "Automatic",
    condition: "Used",
    availability: "available",
    stockQuantity: 2,
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "Hybrid System"],
    dimensions: [
      "Overall Length: 4400 mm",
      "Overall Width: 1695 mm",
      "Overall Height: 1460 mm",
      "Wheel Base: 2600 mm",
      "Ground Clearance: 140 mm",
      "Kerb Weight: 1130 KG",
      "Seating Capacity: 5 persons",
      "No. of Doors: 4"
    ],
    engine: [
      "Engine Type: Petrol / Hybrid",
      "Displacement: 1496 - 1797 cc",
      "No. of Cylinders: 4",
      "Drive Train: FWD",
      "Horse Power: 109 - 140 HP",
      "Torque: 138 - 173 Nm",
      "Max Speed: 180 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic (CVT)",
      "Gearbox: 7-speed"
    ],
    steering: [
      "Steering Type: Electric Power Steering",
      "Minimum Turning Radius: 5.1m"
    ],
    suspension: [
      "Front Suspension: McPherson Strut",
      "Rear Suspension: Torsion Beam",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Solid Disc"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 185/65/R15",
      "Wheel Size: 15 in"
    ],
    fuel: [
      "Mileage City: 14 - 20 KM/L",
      "Mileage Highway: 18 - 25 KM/L",
      "Fuel Tank Capacity: 50 L"
    ]
  },
  {
    key: "camry",
    name: "Toyota Camry",
    image: "IMG/Toyota_Camry_Front.jpg",
    price: "PKR 1.2 - 1.5 Crore",
    priceNumeric: 13500000,
    year: 2024,
    mileage: "10-22 KM/L",
    bodyType: "Sedan",
    fuelType: "Hybrid",
    transmissionType: "Automatic",
    condition: "New",
    availability: "available",
    stockQuantity: 1,
    isFeatured: true,
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "Leather Seats", "Sunroof", "Navigation"],
    dimensions: [
      "Overall Length: 4885 mm",
      "Overall Width: 1840 mm",
      "Overall Height: 1445 mm",
      "Wheel Base: 2825 mm",
      "Ground Clearance: 145 mm",
      "Kerb Weight: 1530 KG",
      "Seating Capacity: 5 persons",
      "No. of Doors: 4"
    ],
    engine: [
      "Engine Type: Petrol / Hybrid",
      "Displacement: 2487 cc",
      "No. of Cylinders: 4",
      "Drive Train: FWD",
      "Horse Power: 178 - 218 HP",
      "Torque: 221 - 221 Nm",
      "Max Speed: 210 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic",
      "Gearbox: 8-speed"
    ],
    steering: [
      "Steering Type: Electric Power Steering",
      "Minimum Turning Radius: 5.7m"
    ],
    suspension: [
      "Front Suspension: MacPherson Strut",
      "Rear Suspension: Multi-Link",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Solid Disc"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 215/55/R17 - 235/45/R18",
      "Wheel Size: 17 - 18 in"
    ],
    fuel: [
      "Mileage City: 10 - 18 KM/L",
      "Mileage Highway: 14 - 22 KM/L",
      "Fuel Tank Capacity: 60 L"
    ]
  },
  {
    key: "aqua",
    name: "Toyota Aqua",
    image: "IMG/Aqua.jpg",
    price: "PKR 55.0 - 70.0 lacs",
    priceNumeric: 6250000,
    year: 2021,
    mileage: "25-35 KM/L",
    bodyType: "Hatchback",
    fuelType: "Hybrid",
    transmissionType: "Automatic",
    condition: "Used",
    availability: "available",
    stockQuantity: 3,
    isPopular: true,
    features: ["Air Conditioning", "Power Steering", "ABS", "Hybrid System", "Eco Mode"],
    dimensions: [
      "Overall Length: 4050 mm",
      "Overall Width: 1695 mm",
      "Overall Height: 1455 mm",
      "Wheel Base: 2550 mm",
      "Ground Clearance: 140 mm",
      "Kerb Weight: 1100 KG",
      "Seating Capacity: 5 persons",
      "No. of Doors: 5"
    ],
    engine: [
      "Engine Type: Hybrid",
      "Displacement: 1496 cc",
      "No. of Cylinders: 4",
      "Drive Train: FWD",
      "Horse Power: 74 HP + Electric Motor",
      "Torque: 111 Nm",
      "Max Speed: 165 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic (CVT)",
      "Gearbox: E-CVT"
    ],
    steering: [
      "Steering Type: Electric Power Steering",
      "Minimum Turning Radius: 4.7m"
    ],
    suspension: [
      "Front Suspension: McPherson Strut",
      "Rear Suspension: Torsion Beam",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Drum"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 175/65/R15",
      "Wheel Size: 15 in"
    ],
    fuel: [
      "Mileage City: 25 - 28 KM/L",
      "Mileage Highway: 30 - 35 KM/L",
      "Fuel Tank Capacity: 36 L"
    ]
  },
  {
    key: "raize",
    name: "Toyota Raize",
    image: "IMG/Raize.jpg",
    price: "PKR 65.0 - 75.0 lacs",
    priceNumeric: 7000000,
    year: 2023,
    mileage: "16-22 KM/L",
    bodyType: "SUV",
    fuelType: "Petrol",
    transmissionType: "Automatic",
    condition: "New",
    availability: "available",
    stockQuantity: 2,
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "4WD", "High Ground Clearance"],
    dimensions: [
      "Overall Length: 3995 mm",
      "Overall Width: 1695 mm",
      "Overall Height: 1620 mm",
      "Wheel Base: 2525 mm",
      "Ground Clearance: 200 mm",
      "Kerb Weight: 980 KG",
      "Seating Capacity: 5 persons",
      "No. of Doors: 5"
    ],
    engine: [
      "Engine Type: Petrol",
      "Displacement: 996 cc",
      "No. of Cylinders: 3",
      "Drive Train: FWD / 4WD",
      "Horse Power: 98 HP @ 6000 RPM",
      "Torque: 140 Nm @ 2400-4000 RPM",
      "Max Speed: 170 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic (CVT)",
      "Gearbox: D-CVT"
    ],
    steering: [
      "Steering Type: Electric Power Steering",
      "Minimum Turning Radius: 4.9m"
    ],
    suspension: [
      "Front Suspension: MacPherson Strut",
      "Rear Suspension: Torsion Beam",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Drum"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 195/65/R16",
      "Wheel Size: 16 in"
    ],
    fuel: [
      "Mileage City: 16 - 18 KM/L",
      "Mileage Highway: 20 - 22 KM/L",
      "Fuel Tank Capacity: 36 L"
    ]
  },
  {
    key: "chr",
    name: "Toyota C-HR",
    image: "IMG/C-HR-(cover-photo)..jpg",
    price: "PKR 95.0 - 1.1 Crore",
    priceNumeric: 10250000,
    year: 2024,
    mileage: "12-22 KM/L",
    bodyType: "SUV",
    fuelType: "Hybrid",
    transmissionType: "Automatic",
    condition: "New",
    availability: "available",
    stockQuantity: 1,
    isFeatured: true,
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "Hybrid System", "Sporty Design"],
    dimensions: [
      "Overall Length: 4385 mm",
      "Overall Width: 1795 mm",
      "Overall Height: 1550 mm",
      "Wheel Base: 2640 mm",
      "Ground Clearance: 155 mm",
      "Kerb Weight: 1395 KG",
      "Seating Capacity: 5 persons",
      "No. of Doors: 5"
    ],
    engine: [
      "Engine Type: Petrol / Hybrid",
      "Displacement: 1798 - 1987 cc",
      "No. of Cylinders: 4",
      "Drive Train: FWD / 4WD",
      "Horse Power: 122 - 184 HP",
      "Torque: 142 - 185 Nm",
      "Max Speed: 180 - 200 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic (CVT)",
      "Gearbox: 7-speed / E-CVT"
    ],
    steering: [
      "Steering Type: Electric Power Steering",
      "Minimum Turning Radius: 5.2m"
    ],
    suspension: [
      "Front Suspension: MacPherson Strut",
      "Rear Suspension: Double Wishbone",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Solid Disc"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 215/60/R17 - 225/50/R18",
      "Wheel Size: 17 - 18 in"
    ],
    fuel: [
      "Mileage City: 12 - 18 KM/L",
      "Mileage Highway: 16 - 22 KM/L",
      "Fuel Tank Capacity: 50 L"
    ]
  },
  {
    key: "corolla-cross",
    name: "Toyota Corolla Cross",
    image: "IMG/Corolla_Cross_JDM.png",
    price: "PKR 85.0 - 95.0 lacs",
    priceNumeric: 9000000,
    year: 2024,
    mileage: "12-18 KM/L",
    bodyType: "SUV",
    fuelType: "Petrol",
    transmissionType: "Automatic",
    condition: "New",
    availability: "available",
    stockQuantity: 2,
    isPopular: true,
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "4WD", "Crossover Design"],
    dimensions: [
      "Overall Length: 4460 mm",
      "Overall Width: 1825 mm",
      "Overall Height: 1620 mm",
      "Wheel Base: 2640 mm",
      "Ground Clearance: 161 mm",
      "Kerb Weight: 1330 KG",
      "Seating Capacity: 5 persons",
      "No. of Doors: 5"
    ],
    engine: [
      "Engine Type: Petrol / Hybrid",
      "Displacement: 1798 cc",
      "No. of Cylinders: 4",
      "Drive Train: FWD / 4WD",
      "Horse Power: 138 - 169 HP",
      "Torque: 172 - 207 Nm",
      "Max Speed: 180 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic (CVT)",
      "Gearbox: 7-speed / E-CVT"
    ],
    steering: [
      "Steering Type: Electric Power Steering",
      "Minimum Turning Radius: 5.2m"
    ],
    suspension: [
      "Front Suspension: MacPherson Strut",
      "Rear Suspension: Double Wishbone",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Solid Disc"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 215/60/R17 - 225/50/R18",
      "Wheel Size: 17 - 18 in"
    ],
    fuel: [
      "Mileage City: 12 - 18 KM/L",
      "Mileage Highway: 16 - 22 KM/L",
      "Fuel Tank Capacity: 47 L"
    ]
  },
  {
    key: "fortuner",
    name: "Toyota Fortuner",
    image: "IMG/Fortuner.png",
    price: "PKR 1.45 - 1.75 Crore",
    priceNumeric: 16000000,
    year: 2024,
    mileage: "8-14 KM/L",
    bodyType: "SUV",
    fuelType: "Diesel",
    transmissionType: "Automatic",
    condition: "New",
    availability: "available",
    stockQuantity: 1,
    isFeatured: true,
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "4WD", "7-Seater", "Leather Seats"],
    dimensions: [
      "Overall Length: 4795 mm",
      "Overall Width: 1855 mm",
      "Overall Height: 1835 mm",
      "Wheel Base: 2745 mm",
      "Ground Clearance: 220 mm",
      "Kerb Weight: 2080 KG",
      "Seating Capacity: 7 persons",
      "No. of Doors: 5"
    ],
    engine: [
      "Engine Type: Diesel / Petrol",
      "Displacement: 2393 - 2755 cc",
      "No. of Cylinders: 4",
      "Drive Train: 4WD / RWD",
      "Horse Power: 150 - 204 HP",
      "Torque: 343 - 500 Nm",
      "Max Speed: 180 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic / Manual",
      "Gearbox: 6-speed"
    ],
    steering: [
      "Steering Type: Power Steering",
      "Minimum Turning Radius: 5.8m"
    ],
    suspension: [
      "Front Suspension: Double Wishbone",
      "Rear Suspension: 4-Link with Coil Spring",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Ventilated Disc"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 265/65/R17 - 265/60/R18",
      "Wheel Size: 17 - 18 in"
    ],
    fuel: [
      "Mileage City: 8 - 10 KM/L",
      "Mileage Highway: 12 - 14 KM/L",
      "Fuel Tank Capacity: 80 L"
    ]
  },
  {
    key: "prado",
    name: "Toyota Prado",
    image: "IMG/PRADO.jpg",
    price: "PKR 2.0 - 2.5 Crore",
    priceNumeric: 22500000,
    year: 2023,
    mileage: "7-12 KM/L",
    bodyType: "SUV",
    fuelType: "Diesel",
    transmissionType: "Automatic",
    condition: "New",
    availability: "available",
    stockQuantity: 1,
    isFeatured: true,
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "4WD", "7-Seater", "Premium Interior"],
    dimensions: [
      "Overall Length: 4840 mm",
      "Overall Width: 1885 mm",
      "Overall Height: 1850 mm",
      "Wheel Base: 2790 mm",
      "Ground Clearance: 220 mm",
      "Kerb Weight: 2330 KG",
      "Seating Capacity: 7 persons",
      "No. of Doors: 5"
    ],
    engine: [
      "Engine Type: Diesel / Petrol",
      "Displacement: 2755 - 3956 cc",
      "No. of Cylinders: 4 - 6",
      "Drive Train: 4WD",
      "Horse Power: 163 - 282 HP",
      "Torque: 420 - 381 Nm",
      "Max Speed: 180 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic",
      "Gearbox: 6-speed"
    ],
    steering: [
      "Steering Type: Power Steering",
      "Minimum Turning Radius: 5.8m"
    ],
    suspension: [
      "Front Suspension: Double Wishbone",
      "Rear Suspension: 4-Link with Coil Spring",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Ventilated Disc"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 265/65/R17 - 265/60/R18",
      "Wheel Size: 17 - 18 in"
    ],
    fuel: [
      "Mileage City: 7 - 9 KM/L",
      "Mileage Highway: 10 - 12 KM/L",
      "Fuel Tank Capacity: 87 L"
    ]
  },
  {
    key: "land-cruiser",
    name: "Toyota Land Cruiser 300",
    image: "IMG/Land_Cruiser_300_-_PNG.png",
    price: "PKR 10.0 - 12.0 Crore",
    priceNumeric: 110000000,
    year: 2024,
    mileage: "6-11 KM/L",
    bodyType: "SUV",
    fuelType: "Petrol",
    transmissionType: "Automatic",
    condition: "New",
    availability: "available",
    stockQuantity: 1,
    isFeatured: true,
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "4WD", "7-Seater", "Luxury Interior", "Off-Road Capability"],
    dimensions: [
      "Overall Length: 4985 mm",
      "Overall Width: 1980 mm",
      "Overall Height: 1925 mm",
      "Wheel Base: 2850 mm",
      "Ground Clearance: 230 mm",
      "Kerb Weight: 2630 KG",
      "Seating Capacity: 7 persons",
      "No. of Doors: 5"
    ],
    engine: [
      "Engine Type: Diesel / Petrol",
      "Displacement: 3346 - 3445 cc",
      "No. of Cylinders: 6",
      "Drive Train: 4WD",
      "Horse Power: 309 - 415 HP",
      "Torque: 500 - 650 Nm",
      "Max Speed: 210 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic",
      "Gearbox: 10-speed"
    ],
    steering: [
      "Steering Type: Electric Power Steering",
      "Minimum Turning Radius: 5.9m"
    ],
    suspension: [
      "Front Suspension: Double Wishbone",
      "Rear Suspension: Multi-Link",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Ventilated Disc"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 285/65/R18",
      "Wheel Size: 18 in"
    ],
    fuel: [
      "Mileage City: 6 - 8 KM/L",
      "Mileage Highway: 9 - 11 KM/L",
      "Fuel Tank Capacity: 110 L"
    ]
  },
  {
    key: "surf",
    name: "Toyota Surf",
    image: "IMG/surf_new.jpg",
    price: "PKR 1.2 - 1.5 Crore",
    priceNumeric: 13500000,
    year: 2020,
    mileage: "8-13 KM/L",
    bodyType: "SUV",
    fuelType: "Diesel",
    transmissionType: "Automatic",
    condition: "Used",
    availability: "available",
    stockQuantity: 1,
    features: ["Air Conditioning", "Power Steering", "ABS", "4WD", "7-Seater"],
    dimensions: [
      "Overall Length: 4805 mm",
      "Overall Width: 1875 mm",
      "Overall Height: 1800 mm",
      "Wheel Base: 2790 mm",
      "Ground Clearance: 215 mm",
      "Kerb Weight: 2100 KG",
      "Seating Capacity: 7 persons",
      "No. of Doors: 5"
    ],
    engine: [
      "Engine Type: Diesel",
      "Displacement: 2982 cc",
      "No. of Cylinders: 4",
      "Drive Train: 4WD",
      "Horse Power: 163 HP",
      "Torque: 343 Nm",
      "Max Speed: 170 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic / Manual",
      "Gearbox: 5-speed"
    ],
    steering: [
      "Steering Type: Power Steering",
      "Minimum Turning Radius: 5.8m"
    ],
    suspension: [
      "Front Suspension: Double Wishbone",
      "Rear Suspension: 4-Link with Coil Spring",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Drum"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 265/70/R16",
      "Wheel Size: 16 in"
    ],
    fuel: [
      "Mileage City: 8 - 10 KM/L",
      "Mileage Highway: 11 - 13 KM/L",
      "Fuel Tank Capacity: 75 L"
    ]
  },
  {
    key: "revo",
    name: "Toyota Hilux Revo",
    image: "IMG/Revo_-_PNG.png",
    price: "PKR 1.0 - 1.4 Crore",
    priceNumeric: 12000000,
    year: 2023,
    mileage: "9-15 KM/L",
    bodyType: "Pickup",
    fuelType: "Diesel",
    transmissionType: "Automatic",
    condition: "New",
    availability: "available",
    stockQuantity: 2,
    isPopular: true,
    features: ["Air Conditioning", "Power Steering", "ABS", "4WD", "Pickup Truck", "Heavy Duty"],
    dimensions: [
      "Overall Length: 5325 mm",
      "Overall Width: 1855 mm",
      "Overall Height: 1815 mm",
      "Wheel Base: 3085 mm",
      "Ground Clearance: 279 mm",
      "Kerb Weight: 2080 KG",
      "Seating Capacity: 5 persons",
      "No. of Doors: 4"
    ],
    engine: [
      "Engine Type: Diesel",
      "Displacement: 2393 - 2755 cc",
      "No. of Cylinders: 4",
      "Drive Train: 4WD / RWD",
      "Horse Power: 150 - 204 HP",
      "Torque: 343 - 500 Nm",
      "Max Speed: 175 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic / Manual",
      "Gearbox: 6-speed"
    ],
    steering: [
      "Steering Type: Power Steering",
      "Minimum Turning Radius: 6.4m"
    ],
    suspension: [
      "Front Suspension: Double Wishbone",
      "Rear Suspension: Leaf Spring",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Drum"
    ],
    wheels: [
      "Wheel Type: Alloy Wheels",
      "Tyre Size: 265/65/R17",
      "Wheel Size: 17 in"
    ],
    fuel: [
      "Mileage City: 9 - 11 KM/L",
      "Mileage Highway: 13 - 15 KM/L",
      "Fuel Tank Capacity: 80 L"
    ]
  },
  {
    key: "hiace",
    name: "Toyota Hiace",
    image: "IMG/hiace-cover.jpg",
    price: "PKR 90.0 lacs - 1.2 Crore",
    priceNumeric: 10500000,
    year: 2023,
    mileage: "8-13 KM/L",
    bodyType: "Van",
    fuelType: "Diesel",
    transmissionType: "Manual",
    condition: "New",
    availability: "available",
    stockQuantity: 1,
    features: ["Air Conditioning", "Power Steering", "15-Seater", "Commercial Use"],
    dimensions: [
      "Overall Length: 5380 mm",
      "Overall Width: 1880 mm",
      "Overall Height: 2285 mm",
      "Wheel Base: 3210 mm",
      "Ground Clearance: 195 mm",
      "Kerb Weight: 2050 KG",
      "Seating Capacity: 15 persons",
      "No. of Doors: 4"
    ],
    engine: [
      "Engine Type: Diesel / Petrol",
      "Displacement: 2755 - 2982 cc",
      "No. of Cylinders: 4",
      "Drive Train: RWD",
      "Horse Power: 136 - 163 HP",
      "Torque: 300 - 343 Nm",
      "Max Speed: 150 KM/H"
    ],
    transmission: [
      "Transmission Type: Automatic / Manual",
      "Gearbox: 6-speed"
    ],
    steering: [
      "Steering Type: Power Steering",
      "Minimum Turning Radius: 6.0m"
    ],
    suspension: [
      "Front Suspension: Double Wishbone",
      "Rear Suspension: Leaf Spring",
      "Front Brakes: Ventilated Disc",
      "Rear Brakes: Drum"
    ],
    wheels: [
      "Wheel Type: Steel Wheels",
      "Tyre Size: 195/80/R15",
      "Wheel Size: 15 in"
    ],
    fuel: [
      "Mileage City: 8 - 10 KM/L",
      "Mileage Highway: 11 - 13 KM/L",
      "Fuel Tank Capacity: 70 L"
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Car.deleteMany({});
    console.log('Cleared existing car data');
    
    // Insert new data
    await Car.insertMany(carsData);
    console.log('✅ Database seeded successfully with', carsData.length, 'cars');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
