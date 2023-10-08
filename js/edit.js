const edit_form = document.getElementById("edit_form");

edit_form.addEventListener("submit", function (e) {
    e.preventDefault();

    const powerInput = document.getElementById("edit_power_input");
    const markInput = document.getElementById("edit_mark_input");
    const speedInput = document.getElementById("edit_speed_input");

    const power = powerInput.value;
    const mark = markInput.value;
    const speed = speedInput.value;

    if (!power || !mark || !speed) {
        alert("Будь ласка, заповніть всі поля.");
        return;
    }

    const carIndex = localStorage.getItem("editForm"); 

    let cars = JSON.parse(localStorage.getItem("cars"));

    for(let i = 0; i < cars.length; i++) {
        if(i == carIndex) {
            console.log(cars);
            const carId = i;
            cars[i] = {
                power,
                mark,
                speed,
                carId,
            };
            localStorage.setItem("cars", JSON.stringify(cars));
            console.log(cars);
        }
    }

    powerInput.value = "";
    markInput.value = "";
    speedInput.value = "";
});
