import { postCar } from "./api.js";

const createForm = document.getElementById("create_form");

createForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const powerInput = document.getElementById("power_input");
    const markInput = document.getElementById("mark_input");
    const speedInput = document.getElementById("speed_input");

    const power = powerInput.value;
    const mark = markInput.value.trim();
    const speed = speedInput.value; 

    if (!power || !mark || !speed) {
        alert("Будь ласка, заповніть всі поля.");
        return;
    }

    powerInput.value = "";
    markInput.value = "";
    speedInput.value = "";
    
    const newCar = {
        power,
        mark,
        speed,
    };

    postCar(newCar);
});

