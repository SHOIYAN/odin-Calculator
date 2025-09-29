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
  bottomDisplay.textContent += num;
}


//  Button Listeners
numberButtons.forEach((btn) =>
  btn.addEventListener('click', () => handleNumber(btn.textContent.trim()))
);