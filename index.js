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