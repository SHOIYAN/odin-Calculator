'use strict';

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