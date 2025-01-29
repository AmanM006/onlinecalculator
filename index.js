const disp = document.getElementById("display");

function appendToDisplay(input) {
    const displayValue = disp.value;

    // Check if the last character is an operator and prevent adding another operator
    const operators = ['+', '-', '×', '÷'];

    // If input is an operator and the last character is also an operator, do nothing
    if (operators.includes(input) && operators.includes(displayValue.charAt(displayValue.length - 1))) {
        return;
    }

    // If input is not an operator, append it normally
    disp.value += input;
}
function backspace() {
    disp.value = disp.value.slice(0, -1);  // Removes the last character
}
function clearbtn() {
    disp.value = "";
}

function calculate() {
    try {
        // Replace both '×' and '÷' with their valid JavaScript operators
        let expression = disp.value.replace(/×/g, "*").replace(/÷/g, "/"); 
        disp.value = eval(expression); // Evaluate the corrected expression
    } catch (error) {
        disp.value = "Error"; // Handle invalid expressions
    }
}
document.addEventListener("keydown", function(event) {
    const key = event.key; // The key that was pressed

    // Check if the pressed key is a valid calculator key
    const button = document.querySelector(`button[data-key="${key}"]`);

    if (button) {
        // Add the 'hover' class to trigger the hover effect
        button.classList.add('hover');
    }

    // Add the logic for appending to the display based on key press
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '+') {
        appendToDisplay('+');
    } else if (key === '-') {
        appendToDisplay('-');
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        appendToDisplay('/');
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === 'Backspace') {
        backspace();
    } else if (event.key === 'Enter') {
        calculate();
    }
});

document.addEventListener("keyup", function(event) {
    const key = event.key;
    const button = document.querySelector(`button[data-key="${key}"]`);
    
    if (button) {
        // Remove the hover class when the key is released
        button.classList.remove('hover');
    }
});
