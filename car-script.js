
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const carName = urlParams.get("car");
    
    console.log("Car parameter from URL:", carName); // Debug log
    
    // Show loading state initially
    showLoadingState();
    const carData = {
        "passo": {
            name: "Toyota Passo",
            image: "IMG/Toyota_Passo.jpg",
            price: "PKR 30.8 - 34.2 lacs",
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

        "vitz": {
            "name": "Toyota Vitz",
            "image": "IMG/Toyota_Vitz_Front_Right_Angled.jpg",
            "price": "PKR 32.0 - 43.0 lacs",
            "dimensions": [
                "Overall Length: 3945 mm",
                "Overall Width: 1695 mm",
                "Overall Height: 1500 mm",
                "Wheel Base: 2510 mm",
                "Ground Clearance: 140 mm",
                "Kerb Weight: 970 KG",
                "Seating Capacity: 5 persons",
                "No. of Doors: 5"
            ],
            "engine": [
                "Engine Type: Petrol",
                "Displacement: 996 - 1496 cc",
                "No. of Cylinders: 3 - 4",
                "Drive Train: FWD",
                "Horse Power: 69 - 106 HP",
                "Torque: 92 - 140 Nm",
                "Max Speed: 180 KM/H"
            ],
            "transmission": [
                "Transmission Type: Automatic (CVT) / Manual",
                "Gearbox: 5-speed / 7-speed"
            ],
            "steering": [
                "Steering Type: Electric Power Steering",
                "Minimum Turning Radius: 4.5m"
            ],
            "suspension": [
                "Front Suspension: McPherson Strut Coil Springs",
                "Rear Suspension: Torsion Beam with Coil Springs",
                "Front Brakes: Ventilated Disc",
                "Rear Brakes: Drum"
            ],
            "wheels": [
                "Wheel Type: Steel / Alloy Wheels",
                "Tyre Size: 165/70/R14 - 185/60/R15",
                "Wheel Size: 14 - 15 in",
                "Spare Tyre PCD: 4 x 100mm"
            ],
            "fuel": [
                "Mileage City: 16 - 18 KM/L",
                "Mileage Highway: 20 - 22 KM/L",
                "Fuel Tank Capacity: 42 L"
            ]
        }
        ,
        "corolla_axio": {
            "name": "Toyota Corolla Axio",
            "image": "IMG/Toyota_Corolla_Axio_11th.jpg",
            "price": "PKR 32.1 - 61.4 lacs",
            "dimensions": [
                "Overall Length: 4400 mm",
                "Overall Width: 1695 mm",
                "Overall Height: 1460 mm",
                "Wheel Base: 2600 mm",
                "Ground Clearance: 150 mm",
                "Kerb Weight: 1150 - 1250 KG",
                "Seating Capacity: 5 persons",
                "No. of Doors: 4"
            ],
            "engine": [
                "Engine Type: Petrol / Hybrid",
                "Displacement: 1496 cc",
                "No. of Cylinders: 4",
                "Drive Train: FWD",
                "Horse Power: 110 - 136 HP",
                "Torque: 136 - 145 Nm",
                "Max Speed: 180 KM/H"
            ],
            "transmission": [
                "Transmission Type: Automatic (CVT) / Manual",
                "Gearbox: 5-speed / 7-speed"
            ],
            "steering": [
                "Steering Type: Electric Power Steering",
                "Minimum Turning Radius: 4.9m"
            ],
            "suspension": [
                "Front Suspension: McPherson Strut Coil Springs",
                "Rear Suspension: Torsion Beam with Coil Springs",
                "Front Brakes: Ventilated Disc",
                "Rear Brakes: Drum"
            ],
            "wheels": [
                "Wheel Type: Alloy Wheels",
                "Tyre Size: 185/60/R15",
                "Wheel Size: 15 in",
                "Spare Tyre PCD: 4 x 100mm"
            ],
            "fuel": [
                "Mileage City: 18 - 22 KM/L",
                "Mileage Highway: 22 - 26 KM/L",
                "Fuel Tank Capacity: 42 L"
            ]
        }

        ,
        "yaris": {
            name: "Toyota Yaris",
            image: "IMG/yaris.jpg",
            price: "PKR 46.5 - 64.5 Lacs",
            dimensions: [
                "Overall Length: 4425 mm",
                "Overall Width: 1730 mm",
                "Overall Height: 1475 mm",
                "Wheel Base: 2550 mm",
                "Ground Clearance: 133 mm",
                "Kerb Weight: 1130 KG",
                "Seating Capacity: 5 persons",
                "No. of Doors: 4"
            ],
            engine: [
                "Engine Type: Petrol",
                "Displacement: 1329cc - 1496cc",
                "No. of Cylinders: 4",
                "Drive Train: FWD",
                "Horse Power: 98 - 106 HP",
                "Torque: 123 - 140 Nm",
                "Max Speed: 190 KM/H"
            ],
            transmission: [
                "Transmission Type: Manual / Automatic (CVT)",
                "Gearbox: 5-speed / 7-speed"
            ],
            steering: [
                "Steering Type: Electric Power Steering",
                "Minimum Turning Radius: 5.1m"
            ],
            suspension: [
                "Front Suspension: McPherson Strut Coil Springs",
                "Rear Suspension: Torsion Beam with Coil Springs",
                "Front Brakes: Ventilated Disc",
                "Rear Brakes: Drum"
            ],
            wheels: [
                "Wheel Type: Alloy Wheels",
                "Tyre Size: 185/60/R15",
                "Wheel Size: 15 in",
                "Spare Tyre PCD: 4 x 100mm"
            ],
            fuel: [
                "Mileage City: 14 - 16 KM/L",
                "Mileage Highway: 18 - 20 KM/L",
                "Fuel Tank Capacity: 42 L"
            ]

        },
        "yaris_hatchback": {
            "name": "Toyota Yaris Hatchback",
            "image": "IMG/yaris-red-edited.jpg",
            "price": "PKR 40.0 - 48.1 lacs ",
            "dimensions": [
                "Overall Length: 3940 mm",
                "Overall Width: 1695 mm",
                "Overall Height: 1500 mm",
                "Wheel Base: 2550 mm",
                "Ground Clearance: 140 mm",
                "Kerb Weight: 1040 - 1100 KG",
                "Seating Capacity: 5 persons",
                "No. of Doors: 5"
            ],
            "engine": [
                "Engine Type: Petrol / Hybrid",
                "Displacement: 996cc - 1496cc",
                "No. of Cylinders: 3 - 4",
                "Drive Train: FWD",
                "Horse Power: 68 - 116 HP",
                "Torque: 92 - 145 Nm",
                "Max Speed: 175 - 190 KM/H"
            ],
            "transmission": [
                "Transmission Type: Automatic (CVT) / Manual",
                "Gearbox: 5-speed / 7-speed"
            ],
            "steering": [
                "Steering Type: Electric Power Steering",
                "Minimum Turning Radius: 4.8m"
            ],
            "suspension": [
                "Front Suspension: McPherson Strut Coil Springs",
                "Rear Suspension: Torsion Beam with Coil Springs",
                "Front Brakes: Ventilated Disc",
                "Rear Brakes: Drum"
            ],
            "wheels": [
                "Wheel Type: Alloy Wheels",
                "Tyre Size: 185/60/R15",
                "Wheel Size: 15 in",
                "Spare Tyre PCD: 4 x 100mm"
            ],
            "fuel": [
                "Mileage City: 19 - 23 KM/L",
                "Mileage Highway: 24 - 28 KM/L",
                "Fuel Tank Capacity: 40 L"
            ]
        }
        , "raize": {
            "name": "Toyota Raize",
            "image": "IMG/Raize.jpg",
            "price": "PKR 48.6 - 75.1 lacs",
            "dimensions": [
                "Overall Length: 3995 mm",
                "Overall Width: 1695 mm",
                "Overall Height: 1620 mm",
                "Wheel Base: 2525 mm",
                "Ground Clearance: 185 mm",
                "Kerb Weight: 970 - 1050 KG",
                "Seating Capacity: 5 persons",
                "No. of Doors: 5"
            ],
            "engine": [
                "Engine Type: Petrol Turbo / Hybrid",
                "Displacement: 996cc - 1198cc",
                "No. of Cylinders: 3",
                "Drive Train: FWD / AWD",
                "Horse Power: 87 - 98 HP",
                "Torque: 113 - 140 Nm",
                "Max Speed: 170 - 180 KM/H"
            ],
            "transmission": [
                "Transmission Type: Automatic (CVT)",
                "Gearbox: 1-speed"
            ],
            "steering": [
                "Steering Type: Electric Power Steering",
                "Minimum Turning Radius: 4.9m"
            ],
            "suspension": [
                "Front Suspension: McPherson Strut Coil Springs",
                "Rear Suspension: Torsion Beam with Coil Springs",
                "Front Brakes: Ventilated Disc",
                "Rear Brakes: Drum"
            ],
            "wheels": [
                "Wheel Type: Alloy Wheels",
                "Tyre Size: 195/60/R17",
                "Wheel Size: 17 in",
                "Spare Tyre PCD: 4 x 100mm"
            ],
            "fuel": [
                "Mileage City: 18 - 22 KM/L",
                "Mileage Highway: 22 - 26 KM/L",
                "Fuel Tank Capacity: 36 L"
            ]
        }
        , "chr": {
            "name": "Toyota C-HR",
            "image": "IMG/C-HR-(cover-photo)..jpg",
            "price": "PKR 55.8 - 85.3 lacs",
            "dimensions": [
                "Overall Length: 4390 mm",
                "Overall Width: 1795 mm",
                "Overall Height: 1565 mm",
                "Wheel Base: 2640 mm",
                "Ground Clearance: 140 mm",
                "Kerb Weight: 1400 - 1500 KG",
                "Seating Capacity: 5 persons",
                "No. of Doors: 5"
            ],
            "engine": [
                "Engine Type: Petrol / Hybrid",
                "Displacement: 1798cc - 1987cc",
                "No. of Cylinders: 4",
                "Drive Train: FWD / AWD",
                "Horse Power: 120 - 184 HP",
                "Torque: 142 - 190 Nm",
                "Max Speed: 180 KM/H"
            ],
            "transmission": [
                "Transmission Type: Automatic (CVT)",
                "Gearbox: 1-speed"
            ],
            "steering": [
                "Steering Type: Electric Power Steering",
                "Minimum Turning Radius: 5.2m"
            ],
            "suspension": [
                "Front Suspension: McPherson Strut Coil Springs",
                "Rear Suspension: Double Wishbone",
                "Front Brakes: Ventilated Disc",
                "Rear Brakes: Solid Disc"
            ],
            "wheels": [
                "Wheel Type: Alloy Wheels",
                "Tyre Size: 225/50/R18",
                "Wheel Size: 18 in",
                "Spare Tyre PCD: 5 x 114.3mm"
            ],
            "fuel": [
                "Mileage City: 18 - 22 KM/L",
                "Mileage Highway: 20 - 24 KM/L",
                "Fuel Tank Capacity: 43 L"
            ]
        }
        ,
        "corolla": {
            "name": "Toyota Corolla",
            "image": "IMG/corolla.jpg",
            "price": "PKR 61.0 - 77.1 lacs",
            "dimensions": [
                "Overall Length: 4620 mm",
                "Overall Width: 1775 mm",
                "Overall Height: 1475 mm",
                "Wheel Base: 2700 mm",
                "Ground Clearance: 145 mm",
                "Kerb Weight: 1250 - 1385 KG",
                "Seating Capacity: 5 persons",
                "No. of Doors: 4"
            ],
            "engine": [
                "Engine Type: Petrol",
                "Displacement: 1298cc - 1798cc",
                "No. of Cylinders: 4",
                "Drive Train: FWD",
                "Horse Power: 97 - 138 HP",
                "Torque: 123 - 173 Nm",
                "Max Speed: 200 KM/H"
            ],
            "transmission": [
                "Transmission Type: Manual / Automatic (CVT)",
                "Gearbox: 5-speed / 7-speed"
            ],
            "steering": [
                "Steering Type: Electric Power Steering",
                "Minimum Turning Radius: 5.4m"
            ],
            "suspension": [
                "Front Suspension: McPherson Strut Coil Springs",
                "Rear Suspension: Torsion Beam with Coil Springs",
                "Front Brakes: Ventilated Disc",
                "Rear Brakes: Solid Disc"
            ],
            "wheels": [
                "Wheel Type: Alloy / Steel Wheels",
                "Tyre Size: 195/65/R15",
                "Wheel Size: 15 - 16 in",
                "Spare Tyre PCD: 5 x 100mm"
            ],
            "fuel": [
                "Mileage City: 12 - 14 KM/L",
                "Mileage Highway: 16 - 18 KM/L",
                "Fuel Tank Capacity: 50 L"
            ]
        }
        ,
        "surf": {
            "name": "Toyota Surf",
            "image": "IMG/surf_new.jpg",
            "price": "PKR PKR 59.4 - 1.11 Crore",
            "dimensions": [
                "Overall Length: 4770 mm",
                "Overall Width: 1875 mm",
                "Overall Height: 1790 mm",
                "Wheel Base: 2790 mm",
                "Ground Clearance: 225 mm",
                "Kerb Weight: 1830 - 2000 KG",
                "Seating Capacity: 5 - 7 persons",
                "No. of Doors: 5"
            ],
            "engine": [
                "Engine Type: Petrol / Diesel",
                "Displacement: 2693cc - 3956cc",
                "No. of Cylinders: 4 - 6",
                "Drive Train: 4WD",
                "Horse Power: 150 - 249 HP",
                "Torque: 246 - 380 Nm",
                "Max Speed: 180 KM/H"
            ],
            "transmission": [
                "Transmission Type: Automatic / Manual",
                "Gearbox: 4-speed / 5-speed"
            ],
            "steering": [
                "Steering Type: Hydraulic Power Steering",
                "Minimum Turning Radius: 5.7m"
            ],
            "suspension": [
                "Front Suspension: Double Wishbone",
                "Rear Suspension: 4-Link Coil Springs",
                "Front Brakes: Ventilated Disc",
                "Rear Brakes: Ventilated Disc"
            ],
            "wheels": [
                "Wheel Type: Alloy Wheels",
                "Tyre Size: 265/70/R16",
                "Wheel Size: 16 - 17 in",
                "Spare Tyre PCD: 6 x 139.7mm"
            ],
            "fuel": [
                "Mileage City: 6 - 9 KM/L",
                "Mileage Highway: 8 - 12 KM/L",
                "Fuel Tank Capacity: 87 L"
            ]
        }
        
        , "aqua": {
            "name": "Toyota Aqua",
            "image": "IMG/Aqua.jpg",
            "price": "PKR 66.4 - 70.8 lacs",
            "dimensions": [
                "Overall Length: 4050 mm",
                "Overall Width: 1695 mm",
                "Overall Height: 1455 mm",
                "Wheel Base: 2550 mm",
                "Ground Clearance: 140 mm",
                "Kerb Weight: 1080 - 1130 KG",
                "Seating Capacity: 5 persons",
                "No. of Doors: 5"
            ],
            "engine": [
                "Engine Type: Hybrid (Petrol + Electric)",
                "Displacement: 1496cc",
                "No. of Cylinders: 4",
                "Drive Train: FWD",
                "Horse Power: 116 HP",
                "Torque: 120 Nm",
                "Max Speed: 180 KM/H"
            ],
            "transmission": [
                "Transmission Type: Automatic (CVT)",
                "Gearbox: e-CVT"
            ],
            "steering": [
                "Steering Type: Electric Power Steering",
                "Minimum Turning Radius: 4.8m"
            ],
            "suspension": [
                "Front Suspension: McPherson Strut Coil Springs",
                "Rear Suspension: Torsion Beam with Coil Springs",
                "Front Brakes: Ventilated Disc",
                "Rear Brakes: Drum"
            ],
            "wheels": [
                "Wheel Type: Alloy Wheels",
                "Tyre Size: 175/65/R15",
                "Wheel Size: 15 in",
                "Spare Tyre PCD: 4 x 100mm"
            ],
            "fuel": [
                "Mileage City: 24 - 28 KM/L",
                "Mileage Highway: 28 - 32 KM/L",
                "Fuel Tank Capacity: 36 L"
            ]
        },

        "corolla_cross": {
            "name": "Toyota Corolla Cross",
            "image": "IMG/Corolla_Cross_JDM.png",
            "price": "PKR 72.4 lacs - 89.4 Crore",
            "dimensions": [
                "Overall Length: 4460 mm",
                "Overall Width: 1825 mm",
                "Overall Height: 1620 mm",
                "Wheel Base: 2640 mm",
                "Ground Clearance: 161 mm",
                "Kerb Weight: 1325 - 1400 KG",
                "Seating Capacity: 5 persons",
                "No. of Doors: 5"
            ],
            "engine": [
                "Engine Type: Hybrid (Petrol + Electric)",
                "Displacement: 1798cc",
                "No. of Cylinders: 4",
                "Drive Train: FWD",
                "Horse Power: 168 HP",
                "Torque: 305 Nm",
                "Max Speed: 180 KM/H"
            ],
            "transmission": [
                "Transmission Type: Automatic (e-CVT)",
                "Gearbox: e-CVT"
            ],
            "steering": [
                "Steering Type: Electric Power Steering",
                "Minimum Turning Radius: 5.2m"
            ],
            "suspension": [
                "Front Suspension: MacPherson Strut Coil Springs",
                "Rear Suspension: Torsion Beam",
                "Front Brakes: Ventilated Disc",
                "Rear Brakes: Solid Disc"
            ],
            "wheels": [
                "Wheel Type: Alloy Wheels",
                "Tyre Size: 215/60/R17",
                "Wheel Size: 17 in",
                "Spare Tyre PCD: 5 x 114.3mm"
            ],
            "fuel": [
                "Mileage City: 18 - 20 KM/L",
                "Mileage Highway: 22 - 24 KM/L",
                "Fuel Tank Capacity: 36 L"
            ]
        },

        "hiace": {
            "name": "Toyota Hiace",
            "image": "IMG/hiace-cover.jpg",
            "price": "PKR 1.31 - 2.1 crore",
            "dimensions": [
                "Overall Length: 5265 mm",
                "Overall Width: 1950 mm",
                "Overall Height: 1990 mm",
                "Wheel Base: 3210 mm",
                "Ground Clearance: 185 mm",
                "Kerb Weight: 2000 - 2500 KG",
                "Seating Capacity: 12 - 17 persons",
                "No. of Doors: 4"
            ],
            "engine": [
                "Engine Type: Diesel",
                "Displacement: 2755cc",
                "No. of Cylinders: 4",
                "Drive Train: RWD",
                "Horse Power: 174 HP",
                "Torque: 420 Nm",
                "Max Speed: 160 KM/H"
            ],
            "transmission": [
                "Transmission Type: Manual / Automatic",
                "Gearbox: 6-speed"
            ],
            "steering": [
                "Steering Type: Hydraulic Power Steering",
                "Minimum Turning Radius: 6.2m"
            ],
            "suspension": [
                "Front Suspension: MacPherson Strut",
                "Rear Suspension: Leaf Springs",
                "Front Brakes: Ventilated Disc",
                "Rear Brakes: Drum"
            ],
            "wheels": [
                "Wheel Type: Steel Wheels",
                "Tyre Size: 215/75/R16",
                "Wheel Size: 16 in",
                "Spare Tyre PCD: 6 x 139.7mm"
            ],
            "fuel": [
                "Mileage City: 8 - 10 KM/L",
                "Mileage Highway: 10 - 12 KM/L",
                "Fuel Tank Capacity: 70 L"
            ]
        },

        "hilux": {
            "name": "Toyota Hilux",
            "image": "IMG/Revo_-_PNG.png",
            "price": "PKR 1.14 - 1.58 Crore",
            "dimensions": [
                "Overall Length: 5325 mm",
                "Overall Width: 1855 mm",
                "Overall Height: 1815 mm",
                "Wheel Base: 3085 mm",
                "Ground Clearance: 216 mm",
                "Kerb Weight: 1990 - 2145 KG",
                "Seating Capacity: 5 persons",
                "No. of Doors: 4"
            ],
            "engine": [
                "Engine Type: Diesel",
                "Displacement: 2755cc",
                "No. of Cylinders: 4",
                "Drive Train: 4WD",
                "Horse Power: 201 HP",
                "Torque: 500 Nm",
                "Max Speed: 180 KM/H"
            ],
            "transmission": [
                "Transmission Type: Manual / Automatic",
                "Gearbox: 6-speed"
            ],
            "steering": [
                "Steering Type: Hydraulic Power Steering",
                "Minimum Turning Radius: 5.9m"
            ],
            "suspension": [
                "Front Suspension: Double Wishbone",
                "Rear Suspension: Leaf Springs",
                "Front Brakes: Ventilated Disc",
                "Rear Brakes: Drum"
            ],
            "wheels": [
                "Wheel Type: Alloy Wheels",
                "Tyre Size: 265/60/R18",
                "Wheel Size: 18 in",
                "Spare Tyre PCD: 6 x 139.7mm"
            ],
            "fuel": [
                "Mileage City: 9 - 11 KM/L",
                "Mileage Highway: 12 - 14 KM/L",
                "Fuel Tank Capacity: 80 L"
            ]
        }, 
        "camry": {
    "name": "Toyota Camry",
    "image": "IMG/Toyota_Camry_Front.jpg",
    "price": "3 crore",
    "dimensions": [
        "Overall Length: 4885 mm",
        "Overall Width: 1840 mm",
        "Overall Height: 1445 mm",
        "Wheel Base: 2825 mm",
        "Ground Clearance: 145 mm",
        "Kerb Weight: 1625 - 1650 KG",
        "Seating Capacity: 5 persons",
        "No. of Doors: 4"
    ],
    "engine": [
        "Engine Type: Hybrid Petrol",
        "Displacement: 2487cc",
        "No. of Cylinders: 4",
        "Drive Train: FWD",
        "Horse Power: 176 HP (Petrol) + 118 HP (Electric)",
        "Torque: 221 Nm (Petrol) + 202 Nm (Electric)",
        "Max Speed: 180 KM/H"
    ],
    "transmission": [
        "Transmission Type: e-CVT",
        "Gearbox: Automatic"
    ],
    "steering": [
        "Steering Type: Electric Power Steering",
        "Minimum Turning Radius: 5.5m"
    ],
    "suspension": [
        "Front Suspension: MacPherson Strut",
        "Rear Suspension: Multi-Link",
        "Front Brakes: Ventilated Disc",
        "Rear Brakes: Solid Disc"
    ],
    "wheels": [
        "Wheel Type: Alloy Wheels",
        "Tyre Size: 215/55/R17",
        "Wheel Size: 17 in",
        "Spare Tyre PCD: 5 x 114.3mm"
    ],
    "fuel": [
        "Mileage City: 18 - 20 KM/L",
        "Mileage Highway: 20 - 22 KM/L",
        "Fuel Tank Capacity: 50 L"
    ]
},

"prado": {
    "name": "Toyota Prado",
    "image": "IMG/PRADO.jpg",
    "price": "PKR 5.5 - 6 crore ",
    "dimensions": [
        "Overall Length: 4840 mm",
        "Overall Width: 1885 mm",
        "Overall Height: 1890 mm",
        "Wheel Base: 2790 mm",
        "Ground Clearance: 220 mm",
        "Kerb Weight: 2150 - 2350 KG",
        "Seating Capacity: 7 persons",
        "No. of Doors: 5"
    ],
    "engine": [
        "Engine Type: Turbo Diesel",
        "Displacement: 2755cc",
        "No. of Cylinders: 4",
        "Drive Train: 4WD",
        "Horse Power: 204 HP",
        "Torque: 500 Nm",
        "Max Speed: 175 KM/H"
    ],
    "transmission": [
        "Transmission Type: Automatic",
        "Gearbox: 6-speed"
    ],
    "steering": [
        "Steering Type: Hydraulic Power Steering",
        "Minimum Turning Radius: 5.8m"
    ],
    "suspension": [
        "Front Suspension: Double Wishbone",
        "Rear Suspension: Multi-Link",
        "Front Brakes: Ventilated Disc",
        "Rear Brakes: Ventilated Disc"
    ],
    "wheels": [
        "Wheel Type: Alloy Wheels",
        "Tyre Size: 265/60/R18",
        "Wheel Size: 18 in",
        "Spare Tyre PCD: 6 x 139.7mm"
    ],
    "fuel": [
        "Mileage City: 8 - 10 KM/L",
        "Mileage Highway: 10 - 12 KM/L",
        "Fuel Tank Capacity: 87 L"
    ]
}
    };

    function populateList(id, items) {
        const listElement = document.getElementById(id);
        if (listElement) {
            listElement.innerHTML = "";
            items.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                listElement.appendChild(li);
            });}}

    // Check if car parameter exists
    if (!carName) {
        console.error("No car parameter found in URL");
        showError("No car specified in URL");
        return;
    }

    // Check if car data exists
    if (!carData[carName]) {
        console.error("Car data not found for:", carName);
        showError(`Car details not found for "${carName}"`);
        return;
    }

    // Car found - populate the page
    console.log("Car data found:", carData[carName]);
    populateCarDetails(carData[carName]);
    
    // Set up tab functionality
    setupTabs();
    
    // Set up quick booking form
    setupQuickBooking(carData[carName].name);
    
    // Generate related cars
    generateRelatedCars(carName, carData);
});

// Show loading state
function showLoadingState() {
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const mainContent = document.getElementById('main-content');
    
    if (loadingState) loadingState.style.display = 'flex';
    if (errorState) errorState.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';
}

// Show error state
function showError(message) {
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const mainContent = document.getElementById('main-content');
    
    if (loadingState) loadingState.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';
    
    if (errorState) {
        errorState.style.display = 'flex';
        const errorContent = errorState.querySelector('.error-content p');
        if (errorContent) {
            errorContent.textContent = message;
        }
    }
}

// Show main content
function showMainContent() {
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const mainContent = document.getElementById('main-content');
    
    if (loadingState) loadingState.style.display = 'none';
    if (errorState) errorState.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
}

// Populate car details
function populateCarDetails(car) {
    try {
        // Update car name
        const carNameElement = document.getElementById("car-name");
        if (carNameElement) {
            carNameElement.textContent = car.name;
            document.title = `${car.name} - Al-Aziz Motor House`;
        }

        // Update car image with error handling
        const carImageElement = document.getElementById("car-image");
        if (carImageElement) {
            carImageElement.src = car.image;
            carImageElement.alt = car.name;
            carImageElement.onerror = function() {
                this.src = 'https://via.placeholder.com/600x400/f0f0f0/333?text=' + encodeURIComponent(car.name);
            };
        }

        // Update price
        const carPriceElement = document.getElementById("car-price");
        if (carPriceElement) {
            carPriceElement.textContent = car.price;
        }

        // Update quick stats
        updateQuickStats(car);

        // Populate specifications
        populateList("car-dimensions", car.dimensions);
        populateList("car-engine", car.engine);
        populateList("car-transmission", car.transmission);
        populateList("car-steering", car.steering);
        populateList("car-suspension", car.suspension);
        populateList("car-wheels", car.wheels);
        populateList("car-fuel", car.fuel);

        // Show main content
        showMainContent();
        
    } catch (error) {
        console.error("Error populating car details:", error);
        showError("Error loading car details");
    }
}

// Update quick stats
function updateQuickStats(car) {
    const quickEngine = document.getElementById("quick-engine");
    const quickFuel = document.getElementById("quick-fuel");
    const quickTransmission = document.getElementById("quick-transmission");
    const quickSeating = document.getElementById("quick-seating");

    if (quickEngine && car.engine.length > 0) {
        // Extract engine type from first engine spec
        const engineSpec = car.engine.find(spec => spec.includes("Engine Type")) || car.engine[0];
        quickEngine.textContent = engineSpec.replace(/^[^:]*:\s*/, '');
    }

    if (quickFuel && car.fuel.length > 0) {
        // Extract city mileage
        const fuelSpec = car.fuel.find(spec => spec.includes("Mileage City")) || car.fuel[0];
        quickFuel.textContent = fuelSpec.replace(/^[^:]*:\s*/, '');
    }

    if (quickTransmission && car.transmission.length > 0) {
        // Extract transmission type
        const transSpec = car.transmission.find(spec => spec.includes("Transmission Type")) || car.transmission[0];
        quickTransmission.textContent = transSpec.replace(/^[^:]*:\s*/, '');
    }

    if (quickSeating && car.dimensions.length > 0) {
        // Extract seating capacity
        const seatingSpec = car.dimensions.find(spec => spec.includes("Seating Capacity")) || "5 persons";
        quickSeating.textContent = seatingSpec.replace(/^[^:]*:\s*/, '');
    }
}

// Populate list helper function
function populateList(id, items) {
    const listElement = document.getElementById(id);
    if (listElement && items) {
        listElement.innerHTML = "";
        items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            listElement.appendChild(li);
        });
    }
}

// Setup tab functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const targetPanel = document.getElementById(targetTab + '-panel');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Setup quick booking form
function setupQuickBooking(carName) {
    const quickBookingForm = document.getElementById('quick-booking-form');
    const quickCarNameInput = document.getElementById('quick-car-name');
    const quickBookingMessage = document.getElementById('quick-booking-message');

    if (quickCarNameInput) {
        quickCarNameInput.value = carName;
    }

    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('quick-name').value.trim();
            const phone = document.getElementById('quick-phone').value.trim();
            const email = document.getElementById('quick-email').value.trim();

            // Basic validation
            if (!name || !phone || !email) {
                showQuickBookingMessage('Please fill in all fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showQuickBookingMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Phone validation
            const phoneRegex = /^(\+92|0)?[3][0-9]{9}$/;
            if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
                showQuickBookingMessage('Please enter a valid Pakistani phone number.', 'error');
                return;
            }

            // Success
            showQuickBookingMessage(`Thank you ${name}! We'll contact you soon about the ${carName}.`, 'success');
            quickBookingForm.reset();
            if (quickCarNameInput) quickCarNameInput.value = carName;
        });
    }
}

// Show quick booking message
function showQuickBookingMessage(message, type) {
    const messageElement = document.getElementById('quick-booking-message');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = 'show ' + type;
        
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 5000);
    }
}

// Generate related cars
function generateRelatedCars(currentCarKey, allCarsData) {
    const relatedCarsContainer = document.getElementById('related-cars-container');
    if (!relatedCarsContainer) return;

    // Get 3 random cars excluding the current one
    const otherCars = Object.keys(allCarsData).filter(key => key !== currentCarKey);
    const relatedCars = otherCars.sort(() => 0.5 - Math.random()).slice(0, 3);

    relatedCarsContainer.innerHTML = '';

    relatedCars.forEach(carKey => {
        const car = allCarsData[carKey];
        const carElement = document.createElement('div');
        carElement.className = 'related-car-item';
        carElement.onclick = () => window.open(`car-details.html?car=${carKey}`, '_self');

        carElement.innerHTML = `
            <img src="${car.image}" alt="${car.name}" onerror="this.src='https://via.placeholder.com/300x200/f0f0f0/333?text=${encodeURIComponent(car.name)}'">
            <div class="related-car-info">
                <h4>${car.name}</h4>
                <p>${car.price}</p>
            </div>
        `;

        relatedCarsContainer.appendChild(carElement);
    });
}