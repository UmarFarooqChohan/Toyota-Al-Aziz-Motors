document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar ul");
    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("active");
    });
    document.getElementById("search").addEventListener("keyup", function () {
        let filter = this.value.toLowerCase();
        document.querySelectorAll(".car-item").forEach(car => {
            let carName = car.getAttribute("data-name").toLowerCase();
            car.style.display = carName.includes(filter) ? "block" : "none";
        });
    });
    document.querySelector("#booking form").addEventListener("submit", function (e) {
        e.preventDefault();

        let name = this.querySelector("input[type='text']").value.trim();
        let email = this.querySelector("input[type='email']").value.trim();
        let carModel = this.querySelector("select").value;

        if (name === "" || email === "") {
            alert("Please fill in all fields.");
            return;
        }

        alert(`Thank you, ${name}! Your booking for ${carModel} has been received.`);
    });
});
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
        "price": "PKR 42.0 - 65.2 lacs  ",
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
    }
    ,
    "Toyota CH-R": {
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
        "price": "PKR 66.4 - 97.6 lacs ",
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
        "price": "3 crore",
        "img": "IMG/Toyota_Camry_Front.jpg",
        "engine": "2.5L Hybrid",
        "fuel": "18-22 km/l",
        "transmission": "Automatic (CVT)",
        "seating": "5-Seater",
        "horsepower": "176 HP"
    },

    "Toyota Prado": {
        "price": "6.66 - 7.56 crore ",
        "img": "IMG/PRADO.jpg",
        "engine": "2.8L Diesel / 4.0L Petrol",
        "fuel": "7-12 km/l",
        "transmission": "Automatic / Manual",
        "seating": "7-Seater",
        "horsepower": "201-271 HP"
    }


};


function compareCars() {
    let car1 = document.getElementById("car1").value;
    let car2 = document.getElementById("car2").value;
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

    if (!car1Data || !car2Data) {
        alert("Car data not found. Please check the values.");
        return;
    }
    let resultHTML = `
        <div class="comparison-container">
            <div class="car-comparison">
                <img src="${carData[car1].img}" alt="${car1}">
                <h3>${car1}</h3>
                <p><strong>Price:</strong> ${carData[car1].price}</p>
                <p><strong>Engine:</strong> ${carData[car1].engine}</p>
                <p><strong>Fuel Efficiency:</strong> ${carData[car1].fuel}</p>
                <p><strong>Transmission:</strong> ${carData[car1].transmission}</p>
                <p><strong>Seating Capacity:</strong> ${carData[car1].seating}</p>
                <p><strong>Horsepower:</strong> ${carData[car1].horsepower}</p>
            </div>
            <div class="vs">VS</div>
            <div class="car-comparison">
                <img src="${carData[car2].img}" alt="${car2}">
                <h3>${car2}</h3>
                <p><strong>Price:</strong> ${carData[car2].price}</p>
                <p><strong>Engine:</strong> ${carData[car2].engine}</p>
                <p><strong>Fuel Efficiency:</strong> ${carData[car2].fuel}</p>
                <p><strong>Transmission:</strong> ${carData[car2].transmission}</p>
                <p><strong>Seating Capacity:</strong> ${carData[car2].seating}</p>
                <p><strong>Horsepower:</strong> ${carData[car2].horsepower}</p>
            </div>
        </div>
    `;

    document.getElementById("comparison-result").innerHTML = resultHTML;
}

function openCarDetails(carName) {
    window.open(`car-details.html?car=${carName}`, '_blank');
}
