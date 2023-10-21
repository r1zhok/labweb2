import { getAllCars, updateCar } from "./api.js";

const edit_form = document.getElementById("edit_form");

edit_form.addEventListener("submit", function (e) {
    e.preventDefault();

    const powerInput = document.getElementById("edit_power_input");
    const markInput = document.getElementById("edit_mark_input");
    const speedInput = document.getElementById("edit_speed_input");

    const power = powerInput.value;
    const mark = markInput.value.trim();
    const speed = speedInput.value;

    if (!power || !mark || !speed) {
        alert("Будь ласка, заповніть всі поля.");
        return;
    }

    const carIndex = localStorage.getItem("editForm"); 

    const newCar = {
        power,
        mark,
        speed
    }
    
    updateCar(carIndex, newCar);

    powerInput.value = "";
    markInput.value = "";
    speedInput.value = "";
});
