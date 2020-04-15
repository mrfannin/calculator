// Calculator object
let calculator = {
    displayValue: "",
    currentValue: "",
    currentOperation: [],
}

// Basic math functions
function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

// Operate function, takes the operation string (sign) and uses the math functions
function operate(operator, aStr, bStr)
{
    let a = parseInt(aStr);
    let b = parseInt(bStr);
    switch(operator)
    {
        case "+":
            return add(a,b);
            break;
        case "-":
            return subtract(a,b);
            break;
        case "X":
            return multiply(a,b);
            break;
        case "/":
            return divide(a,b);
            break;
        default:
            return "Not a valid operator";
    }
}

// button switch function, called on any button event, updates display switch
function buttonClick(e) {
    let buttonType = e.target.className;
    
    if (buttonType.includes("number-button"))
    {
        enterNumber(e.target.innerHTML);
    }
    else if (buttonType.includes("clear-button"))
    {
        clear();
    }
    else if (buttonType.includes("operator-button"))
    {
        enterOperator(e.target.innerHTML);
    }
    else if (buttonType.includes("equals-button"))
    {
        // make sure a full operation is in
        if (calculator.currentOperation.length > 1)
        {
            equals();
        }
    }

    // update the display
    displayText.textContent = calculator.displayValue;

    debugDisplay();
}

// functions for buttons
function enterNumber(num)
{
    calculator.currentValue += num;
    calculator.displayValue += num;
}

function enterOperator(operator)
{
    calculator.currentOperation.push(calculator.currentValue);
    calculator.currentValue = "";
    
    calculator.displayValue += ` ${operator} `;
    calculator.currentOperation.push(operator);
}

function clear()
{
    calculator.currentValue = "";
    calculator.displayValue = "";
    calculator.operators = [];
    calculator.values = [];
}

function equals()
{
    calculator.currentOperation.push(calculator.currentValue);
    calculator.currentValue = "";

    // allows order of operation
    while (calculator.currentOperation.length > 1)
    {
        for (let i = 0; i < calculator.currentOperation.length; i++)
        {
            if (calculator.currentOperation[i] == "X" || calculator.currentOperation[i] == "/")
            {
                calculator.currentOperation.splice(i - 1, 3, operate(calculator.currentOperation[i], calculator.currentOperation[i - 1], calculator.currentOperation[i + 1]));
                break;
            }
            else if (calculator.currentOperation[i] == "+" || calculator.currentOperation[i] == "-")
            {
                calculator.currentOperation.splice(i - 1, 3, operate(calculator.currentOperation[i], calculator.currentOperation[i - 1], calculator.currentOperation[i + 1]));
                break;
            }
        }
    }

    calculator.displayValue = calculator.currentOperation[0];
    calculator.currentValue = calculator.currentOperation[0];
}

//log debug information 
function debugDisplay() {
    console.log(calculator.displayValue);
    console.log(calculator.currentValue);
    console.log(calculator.currentOperation);
}


const displayText = document.querySelector("#display-text");
const buttonGrid = document.querySelector("#calculator-buttons");

const buttons = buttonGrid.childNodes;

buttons.forEach(button => {
    button.addEventListener("click", buttonClick);
})