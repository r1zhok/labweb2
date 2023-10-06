const itemsContainer = document.getElementById("items_container");
const sortButton = document.getElementById("sort_button");
const countButton = document.getElementById("button_count");
const spanCount = document.getElementById("span_count");
const findButton = document.getElementById("find_button");
const cancelButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const addForm = document.getElementById("add_form");

const carForms = [];
let cloneForms = [];
let counter = 0;

addForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const powerInput = document.getElementById("power_input");
    const markInput = document.getElementById("mark_input");
    const speedInput = document.getElementById("speed_input");

    const power = powerInput.value;
    const mark = markInput.value;
    const speed = speedInput.value;

    if (!power || !mark || !speed) {
        alert("Будь ласка, заповніть всі поля.");
        return;
    }

    const car = {
        power,
        mark,
        speed,
    };

    carForms.push(car);

    renderCars(car);

    powerInput.value = "";
    markInput.value = "";
    speedInput.value = "";
});

// this from video, it's render form, lol
function renderCars(car) {
    const carForm = document.createElement("div");
    carForm.className = "car-form";
    carForm.innerHTML = `
        <li class="card mb-3 item-card" draggable="true">
            <img src="./image/pexels-garvin-st-villier-3972755.jpg" class="item-container__image card-img-top" alt="card">
            <div class="card-body">
                <p>Потужність: ${car.power} hp</p>
                <p>Марка: ${car.mark}</p>
                <p>Швидкість: ${car.speed} km/h</p>
                <button type="button" class="btn btn-info edit-button">Edit</button>
            </div>
        </li>
    `;

    itemsContainer.appendChild(carForm);
}

// this method sort my list of cars
sortButton.addEventListener("click", () => {
    counter++;
    while (itemsContainer.firstChild) {
        itemsContainer.removeChild(itemsContainer.firstChild);
    }
    if(counter % 2 === 1) {
        cloneForms = carForms.map(car => ({ ...car }));
        const sortedCars = cloneForms.sort((a, b) => b.speed - a.speed);

        sortedCars.forEach((car) => {
            renderCars(car)
        });

        lenghtOfCars(sortedCars);
    } else {
        carForms.forEach((car) => {
            renderCars(car)
        });
        lenghtOfCars(carForms);
    }
});


//this method count of cars
countButton.addEventListener("click", () => {
    lenghtOfCars(carForms);
});

function lenghtOfCars(cars) {
    const carCount = cars.length; 
    spanCount.textContent = carCount; 
}


findButton.addEventListener('click', () => {
    while (itemsContainer.firstChild) {
        itemsContainer.removeChild(itemsContainer.firstChild);
    }
    cloneForms = carForms.map(car => ({ ...car }));
    const searchTerm = findInput.value.toLowerCase();
    const filteredCars = cloneForms.filter(car =>
        car.mark.toLowerCase().includes(searchTerm));
    filteredCars.forEach((car) => {
        renderCars(car)
    });
    lenghtOfCars(filteredCars);
});

cancelButton.addEventListener("click", () => {
    carForms.forEach((car) => {
        renderCars(car);
    });
    lenghtOfCars(carForms)
    findInput.value = "";
});




