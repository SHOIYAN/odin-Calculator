'use strict';

let firstNum = null,
  secondNum = null,
  operator = null,
  shouldResetBottom = false;

// DOM
const topDisplay = document.querySelector(".top");
const bottomDisplay = document.querySelector(".bottom");
const numberButtons = document.querySelectorAll(".number button");
const operatorButtons = document.querySelectorAll(".symbol");
const clear = document.querySelector(".clear button");
const clearEverything = document.querySelector(".clearEverything button");
const period = document.querySelector(".period button");
const plusMinus = document.querySelector(".plusminus");
const equals = document.querySelector(".equals button");


function add(a, b) {
  return parseFloat((a + b).toFixed(4));
}
function subtract(a, b) {
  return parseFloat((a - b).toFixed(4));
}
function multiply(a, b) {
  return parseFloat((a * b).toFixed(4));
}
function divide(a, b) {
  return b === 0 ? "Brah??" : parseFloat((a / b).toFixed(4));
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

// Helper Functions
function handleNumber(num) {
  if (shouldResetBottom) {
    bottomDisplay.textContent = "";
    shouldResetBottom = false;
  }
  if (bottomDisplay.textContent.length >= 10) return;
  bottomDisplay.textContent += num;
}
function handleOperator(op) {
  if (bottomDisplay.textContent === "") return;
  if (op === "=") return;

  if (firstNum !== null && operator) {
    secondNum = parseFloat(bottomDisplay.textContent);
    firstNum = operate(operator, firstNum, secondNum);
    topDisplay.textContent = `${formatOutput(firstNum)} ${op}`;
    bottomDisplay.textContent = formatOutput(firstNum);

  } else {
    firstNum = parseFloat(bottomDisplay.textContent);
    topDisplay.textContent = `${formatOutput(firstNum)} ${op}`;
  }

  operator = op;
  shouldResetBottom = true;
}
function handleEquals() {
  if (firstNum !== null && operator && bottomDisplay.textContent !== "") {
    secondNum = parseFloat(bottomDisplay.textContent);
    const output = operate(operator, firstNum, secondNum);
    topDisplay.textContent = `${formatOutput(firstNum)} ${operator} ${formatOutput(secondNum)} =`;
    bottomDisplay.textContent = formatOutput(output);
    firstNum = output;
    operator = null;
    shouldResetBottom = true;
  }
}
function handleClearAll() {
  firstNum = secondNum = operator = null;
  bottomDisplay.textContent = "";
  topDisplay.textContent = "";
}
function handleBackspace() {
  bottomDisplay.textContent = bottomDisplay.textContent.slice(0, -1);
}
function handlePlusMinus() {
  let input = Number(bottomDisplay.textContent);
  if (isNaN(input)) return;
  bottomDisplay.textContent = formatOutput(input * -1);
}
function handleDecimal() {
  if (bottomDisplay.textContent.length >= 10) return;
  if (!bottomDisplay.textContent.includes(".")) {
    bottomDisplay.textContent += ".";
    shouldResetBottom = false;
  }
}
function formatOutput(num) {
  if (typeof num !== "number" || isNaN(num)) return num;
  const str = num.toString();
  if (str.length > 10) {
    return num.toExponential(4); 
  }
  return parseFloat(num.toFixed(4));
}


//  Button Listeners
numberButtons.forEach((btn) =>
  btn.addEventListener('click', () => handleNumber(btn.textContent.trim()))
);
operatorButtons.forEach((btn) =>
  btn.addEventListener("click", () => handleOperator(btn.dataset.opp))
);
equals.addEventListener("click", handleEquals);
clearEverything.addEventListener("click", handleClearAll);
clear.addEventListener("click", handleBackspace);
plusMinus.addEventListener("click", handlePlusMinus);
period.addEventListener("click", handleDecimal);

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (key >= "0" && key <= "9") handleNumber(key);
  if (["+", "-", "*", "/"].includes(key)) handleOperator(key);
  if (key === "Enter" || key === "=") {
    e.preventDefault();
    handleEquals();
  }
  if (key === "Backspace") handleBackspace();
  if (key === "Escape") handleClearAll();
  if (key === ".") handleDecimal();
});