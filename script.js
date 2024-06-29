let add = (x, y) => x + y;
let subtract = (x, y) => x - y;
let multiply = (x, y) => x * y;
let divide = (x, y) => x / y;

let operate = (x, operator, y) => {
  switch (operator) {
    case '+':
      return add(x, y);
    case '-':
      return subtract(x, y);
    case '*':
      return multiply(x, y);
    case '/':
      return divide(x, y);
    default:
      console.log("Error");
      return null;
  }
};

let buffer = '';
let currentOperator = null;
let firstOperand = null;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === 'C') {
      buffer = '';
      firstOperand = null;
      currentOperator = null;
      display.textContent = '0';
    } else if (value === 'Del') {
      buffer = buffer.slice(0, -1);
      display.textContent = buffer || '0';
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (firstOperand === null) {
        firstOperand = parseFloat(buffer);
      } else if (currentOperator) {
        firstOperand = operate(firstOperand, currentOperator, parseFloat(buffer));
        display.textContent = firstOperand;
      }
      currentOperator = value;
      buffer = '';
    } else if (value === '=') {
      if (firstOperand !== null && currentOperator) {
        buffer = operate(firstOperand, currentOperator, parseFloat(buffer)).toString();
        display.textContent = buffer;
        firstOperand = null;
        currentOperator = null;
      }
    } else {
      buffer += value;
      display.textContent = buffer;
    }
  });
});
