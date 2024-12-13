const display = document.getElementById("display");

const lastCalculation = localStorage.getItem('Calculation');
if (lastCalculation) {
    display.value = JSON.parse(lastCalculation);
}

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = '';
    localStorage.removeItem('Calculation');
}

function calculate() {
    try {
        const calculation = eval(display.value);
        display.value = calculation;
        localStorage.setItem('Calculation', JSON.stringify(calculation));
    }
    catch {
        display.value = "Error";
    }
}

