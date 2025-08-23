document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const carName = urlParams.get("car");
    const carData = {
        "passo": {
            name: "Toyota Passo",
            image: "IMG/Toyota_Passo.jpg",
            price: "PKR 32.0 - 35.2 lacs",
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
            "price": "PKR 37.4 - 65.0 lacs",
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
            price: "PKR 4,299,000",
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
            "price": "PKR 42.0 - 65.2 lacs ",
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
            "price": "PKR 48.9 - 68.6 lacs",
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
            "price": "PKR 58.5 - 95.0 lacs",
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
            "price": "PKR 59.7 - 75.5 lacs",
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
            "price": "PKR PKR 66.4 - 97.6 lacs ",
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
            "price": "PKR 68.5 lacs",
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
            "price": "PKR 76.9 lacs - 1.31 crore",
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
            "price": "PKR 10,979,000",
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
    "price": "PKR 6.66 - 7.56 crore ",
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
// Check if the car exists in the data
if (!carData[carName]) {
    console.error("Car data not found for:", carName);
    document.getElementById("car-details").innerHTML = 
    "<p>Car details not found.</p>";
    return;}
console.log("Car Data Found:", carData[carName]); // Debugging log
// Populate car details on the page
const car = carData[carName];
document.getElementById("car-name").innerText = car.name;
document.getElementById("car-image").src = car.image;
document.getElementById("car-price").innerText = car.price;

// Populate dimensions
const dimensionsList = document.getElementById("car-dimensions");
dimensionsList.innerHTML = car.dimensions.map(dim => 
    `<li>${dim}</li>`).join("");

// Populate engine details
const engineList = document.getElementById("car-engine");
engineList.innerHTML = car.engine.map(eng => `<li>${eng}</li>`).join("");

// Populate transmission details
const transmissionList = document.getElementById("car-transmission");
transmissionList.innerHTML = car.transmission.map(trans => `<li>${trans}</li>`).join("");

// Populate steering details
const steeringList = document.getElementById("car-steering");
steeringList.innerHTML = car.steering.map(steer => `<li>${steer}</li>`).join("");

// Populate suspension details
const suspensionList = document.getElementById("car-suspension");
suspensionList.innerHTML = car.suspension.map(sus => `<li>${sus}</li>`).join("");

// Populate wheels details
const wheelsList = document.getElementById("car-wheels");
wheelsList.innerHTML = car.wheels.map(wheel => `<li>${wheel}</li>`).join("");

// Populate fuel details
const fuelList = document.getElementById("car-fuel");
fuelList.innerHTML = car.fuel.map(fuel => `<li>${fuel}</li>`).join("");

});