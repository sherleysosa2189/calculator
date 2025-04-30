const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
const decimalButton = document.querySelector('.decimal');

let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let shouldResetDisplay = false;
let hasDecimal = false;

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) return "😤 Can't divide by 0";
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  let result;
  switch (operator) {
    case '+': result = add(a, b); break;
    case '-': result = subtract(a, b); break;
    case '*': result = multiply(a, b); break;
    case '/': result = divide(a, b); break;
    default: return null;
  }
  return Math.round(result * 1000) / 1000;
}

function appendNumber(number) {
  if (display.value === '0' || shouldResetDisplay) {
    display.value = number;
    shouldResetDisplay = false;
  } else {
    display.value += number;
  }
}

function appendDecimal() {
  if (shouldResetDisplay) {
    display.value = '0.';
    shouldResetDisplay = false;
    hasDecimal = true;
    decimalButton.disabled = true;
    return;
  }

  if (!hasDecimal) {
    display.value += '.';
    hasDecimal = true;
    decimalButton.disabled = true;
  }
}

function chooseOperator(operator) {
  if (currentOperator !== '' && !shouldResetDisplay) {
    evaluate();
  }
  firstNumber = display.value;
  currentOperator = operator;
  shouldResetDisplay = true;
  hasDecimal = false;
  decimalButton.disabled = false;
}

function evaluate() {
  if (currentOperator === '' || shouldResetDisplay) return;
  secondNumber = display.value;
  const result = operate(currentOperator, firstNumber, secondNumber);
  display.value = result;
  firstNumber = result;
  currentOperator = '';
  shouldResetDisplay = true;
  hasDecimal = (result + '').includes('.');
  decimalButton.disabled = hasDecimal;
}

function clear() {
  display.value = '0';
  firstNumber = '';
  secondNumber = '';
  currentOperator = '';
  shouldResetDisplay = false;
  hasDecimal = false;
  decimalButton.disabled = false;
}

function backspace() {
  if (shouldResetDisplay) return;

  if (display.value.slice(-1) === '.') hasDecimal = false;

  display.value = display.value.slice(0, -1);
  if (display.value === '') display.value = '0';

  decimalButton.disabled = display.value.includes('.');
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      appendNumber(value);
    } else if (value === '.') {
      appendDecimal();
    } else if (['+', '-', '*', '/'].includes(value)) {
      chooseOperator(value);
    } else if (value === '=') {
      evaluate();
    } else if (value === 'AC') {
      clear();
    } else if (value === '←') {
      backspace();
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
  if (e.key === '.' && !hasDecimal) appendDecimal();
  if (['+', '-', '*', '/'].includes(e.key)) chooseOperator(e.key);
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') backspace();
  if (e.key === 'Escape') clear();
});




  