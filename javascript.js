let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let isSecondNumber = false;
let decimalUsed = false;
let displayValue = '';

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

// Function for operations
const add = function (array) {
  return array.reduce((sum, current) => sum + current);
};

const subtract = function (array) {
  return array.reduce((difference, current) => difference - current);
};

const multiply = function (array) {
  return array.reduce((product, current) => product * current);
};

const divide = function (array) {
  if (array[1] === 0) return "Error: Can't divide by zero!";
  return array.reduce((quotient, current) => quotient / current);
};

// General operation function
const operate = function (operator, number1, number2) {
  const numbers = [parseFloat(number1), parseFloat(number2)];

  switch (operator) {
    case '+':
      return add(numbers);
    case '-':
      return subtract(numbers);
    case '*':
      return multiply(numbers);
    case '/':
      return divide(numbers);
    default:
      return "Error: Invalid operator";
  }
};

// Handle button clicks
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    const value = button.textContent;

    // Handle number input
    if (value >= '0' && value <= '9') {
      if (!isSecondNumber) {
        firstNumber += value;
      } else {
        secondNumber += value;
      }
      displayValue += value;
      display.value = displayValue;
      return;
    }

    // Handle decimal point input
    if (value === '.') {
      if (decimalUsed) return;  // Prevent multiple decimals in the same number
      decimalUsed = true;
      if (!isSecondNumber) {
        firstNumber += value;
      } else {
        secondNumber += value;
      }
      displayValue += value;
      display.value = displayValue;
      return;
    }

    // Handle operations
    if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (firstNumber === '') return;
      currentOperator = value;
      isSecondNumber = true;
      decimalUsed = false; // Reset decimal flag for the second number
      displayValue += value;
      display.value = displayValue;
      return;
    }

    // Handle equals
    if (value === '=') {
      if (firstNumber && currentOperator && secondNumber) {
        const result = operate(currentOperator, firstNumber, secondNumber);
        displayValue = result.toString();
        display.value = displayValue;
        firstNumber = displayValue;
        secondNumber = '';
        currentOperator = '';
        isSecondNumber = false;
        decimalUsed = false; // Reset decimal flag after calculation
      }
      return;
    }

    // Handle backspace
    if (value === '←') {
      if (isSecondNumber) {
        secondNumber = secondNumber.slice(0, -1);
      } else {
        firstNumber = firstNumber.slice(0, -1);
      }
      displayValue = displayValue.slice(0, -1);
      display.value = displayValue;
      return;
    }

    // Handle clear (AC)
    if (value === 'AC') {
      firstNumber = '';
      secondNumber = '';
      currentOperator = '';
      isSecondNumber = false;
      decimalUsed = false;
      displayValue = '';
      display.value = '';
      return;
    }
  });
});

// Handle keyboard support
document.addEventListener('keydown', function (event) {
  const key = event.key;

  // Handle number input
  if (key >= '0' && key <= '9') {
    const value = key;
    if (!isSecondNumber) {
      firstNumber += value;
    } else {
      secondNumber += value;
    }
    displayValue += value;
    display.value = displayValue;
  }

  // Handle decimal point
  if (key === '.') {
    if (decimalUsed) return;
    decimalUsed = true;
    if (!isSecondNumber) {
      firstNumber += key;
    } else {
      secondNumber += key;
    }
    displayValue += key;
    display.value = displayValue;
  }

  // Handle operator input
  if (key === '+' || key === '-' || key === '*' || key === '/') {
    if (firstNumber === '' || secondNumber !== '') return;
    currentOperator = key;
    isSecondNumber = true;
    displayValue += key;
    display.value = displayValue;
  }

  // Handle equals (Enter)
  if (key === 'Enter') {
    if (firstNumber && currentOperator && secondNumber) {
      const result = operate(currentOperator, firstNumber, secondNumber);
      displayValue = result;
      display.value = displayValue;
      firstNumber = result.toString();
      secondNumber = '';
      currentOperator = '';
      isSecondNumber = false;
    }
  }

  // Handle backspace (Backspace key)
  if (key === 'Backspace') {
    if (isSecondNumber) {
      secondNumber = secondNumber.slice(0, -1);
      displayValue = displayValue.slice(0, -1);
    } else {
      firstNumber = firstNumber.slice(0, -1);
      displayValue = displayValue.slice(0, -1);
    }
    display.value = displayValue;
  }

  // Handle clear (Escape key)
  if (key === 'Escape') {
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    isSecondNumber = false;
    decimalUsed = false;
    displayValue = '';
    display.value = '';
  }
});


  