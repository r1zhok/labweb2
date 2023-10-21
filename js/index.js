import { getAllCars, deleteCar } from "./api.js";

const itemsContainer = document.getElementById("items_container");
const sortButton = document.getElementById("sort_button");
const countButton = document.getElementById("button_count");
const spanCount = document.getElementById("span_count");
const findButton = document.getElementById("find_button");
const cancelButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");

let cloneForms = [];
let counter = 0;
let carForms = [];

const loadCarsFromBackend = async () => {
    while (itemsContainer.firstChild) {
        itemsContainer.removeChild(itemsContainer.firstChild);
    }
    const cars = await getAllCars();
    carForms = cars;
    carForms.forEach((car) => {
        renderCars(car);
    });
}

loadCarsFromBackend();

// this from video, it's render form, lol
function renderCars(car) {
    const carForm = document.createElement("div");
    carForm.className = "car-form";
    carForm.innerHTML = `
        <li id=${car.id} class="card mb-3 item-card" draggable="true">
            <img src="./image/pexels-garvin-st-villier-3972755.jpg" class="item-container__image card-img-top" alt="card">
            <div class="card-body">
                <p>Потужність: ${car.power} hp</p>
                <p>Марка: ${car.mark}</p>
                <p>Швидкість: ${car.speed} km/h</p>
                <button type="button" class="btn btn-info" id="edit-button">Edit</button>
                <button type="button" class="btn btn-danger" id="delete-button">Delete</button>
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
    while (itemsContainer.firstChild) {
        itemsContainer.removeChild(itemsContainer.firstChild);
    }
    carForms.forEach((car) => {
        renderCars(car);
    });
    lenghtOfCars(carForms)
    findInput.value = "";
});

itemsContainer.addEventListener("click", (event) => {
    if (event.target.id === "edit-button") {
        const editButton = event.target;
        const parentListItem = editButton.closest("li");
        if (parentListItem) {
            const carId = parentListItem.id;
            localStorage["editForm"] = carId;
            window.location.href = "edit.html";
        }
    } else if (event.target.id === "delete-button") {
        const deleteButton = event.target;
        const parentListItem = deleteButton.closest("li");
        if (parentListItem) {
            const carId = parentListItem.id;
            deleteCar(carId).then(() => {
                loadCarsFromBackend().then(() => {
                    while (itemsContainer.firstChild) {
                        itemsContainer.removeChild(itemsContainer.firstChild);
                    }
                    carForms.forEach((car) => {
                        renderCars(car);
                    });
                });
            });
        }
    }
});
