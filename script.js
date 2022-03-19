const buttonNumbers = document.querySelectorAll('.button');
const buttonOperator = document.querySelectorAll('.button-operator');

const buttonDelete = document.querySelector('.button-delete');
const buttonEqual = document.querySelector('.button-equal');
const buttonClear = document.querySelector('.button-clear');


const displayValue = document.querySelector('.displayValue');
const currentNumber = document.querySelector('.displayCurrentNumber')

let firstValue = document.createElement('p');
const operator = document.createElement('p');
let secondValue = document.createElement('p')

displayValue.appendChild(firstValue);
displayValue.appendChild(operator);
displayValue.appendChild(secondValue);

const displayCurrentNumber  = (e) => {
  
  if (e.target.value == '+' || e.target.value === '-' ||
      e.target.value === '/' || e.target.value === '*') {
  
    // if press operator with first value, operator and current number ready make operation
    if (operator.textContent !== '' && firstValue.textContent !== '' && 
        currentNumber.textContent !== '' && secondValue.textContent === '') {
         
      secondValue.textContent = currentNumber.textContent;
      operate();
      operator.textContent = e.target.value;
      firstValue.textContent = currentNumber.textContent;
      secondValue.textContent = '';
      currentNumber.textContent = '';
      return;
    }

    operator.textContent = e.target.value;
    // if press operate and  first value and second value ready make operation 
    if (firstValue.textContent !== '' && secondValue.textContent !== '') {
      
      firstValue.textContent = currentNumber.textContent;
      currentNumber.textContent = '';
      operator.textContent = e.target.value;
      secondValue.textContent = '';

      return;
    }
    //if first value missing assign current number to it
    if (firstValue.textContent === '') {

      firstValue.textContent = currentNumber.textContent;
    // second value missing assign current number to is
    } else if (secondValue.textContent === '') {
      
      secondValue.textContent = currentNumber.textContent;
      console.log('cia')
    }

    clearCurrentNumber()
    return;

    } else {
      currentNumber.textContent += e.target.value
    }
}
// operation rounded
const sum = (num1, num2) => {
  clearCurrentNumber();
  currentNumber.textContent =  Math.round(((num1 + num2)+ Number.EPSILON) * 100) / 100;
}

const subtract = (num1, num2) => {
  clearCurrentNumber();
  currentNumber.textContent = Math.round(((num1 - num2)+ Number.EPSILON) * 100) / 100;
}

const multiply = (num1, num2) => {
  clearCurrentNumber();
  currentNumber.textContent = Math.round(((num1 * num2)+ Number.EPSILON) * 100) / 100;
}

const division = (num1, num2) => {
  clearCurrentNumber();
  currentNumber.textContent = Math.round(((num1 / num2)+ Number.EPSILON) * 100) / 100;
}
 

const operate = () => {
  //if the second value is in the currentNumber section add it to the second value section
  if (secondValue.textContent === '') {
    secondValue.textContent = currentNumber.textContent;
  }
  // alert if try to divide by 0
  if (operator.textContent === '/' && secondValue.textContent === "0") {

    window.alert("Error, operation not allowed!")
    return;
  }
  
  //return if second value is missing
  if (secondValue.textContent === '') {
    return;
  }

  if (operator.textContent === '+') {
    return sum(parseFloat(firstValue.textContent), parseFloat(secondValue.textContent))
  } else if (operator.textContent === '-') {
    return subtract(parseFloat(firstValue.textContent), parseFloat(secondValue.textContent))
  } else if (operator.textContent === '*') {
    return multiply(parseFloat(firstValue.textContent), parseFloat(secondValue.textContent))
  } else if (operator.textContent === '/') {

    return division(parseFloat(firstValue.textContent), parseFloat(secondValue.textContent))
  }
}

const clearAll = () => {
  firstValue.textContent = '';
  secondValue.textContent = '';
  operator.textContent = '';
  currentNumber.textContent = '';
}


const clearCurrentNumber = () => {
  currentNumber.textContent = '';
}

const deleteNumber = () => {

  currentNumber.textContent = currentNumber.textContent.slice(0, -1);

}

buttonNumbers.forEach((button) => 
  button.addEventListener('click', displayCurrentNumber)
)

buttonOperator.forEach((button) =>
  button.addEventListener('click', displayCurrentNumber)
)

buttonClear.addEventListener('click', clearAll);
buttonEqual.addEventListener('click',operate);
buttonDelete.addEventListener('click', deleteNumber);

//keyboard input
window.addEventListener('keydown', function(e){

  if ((e.key >= "0" &&  e.key <= "9") || e.key === '*' || 
      e.key === '+' || e.key === '-' || e.key === '/' || e.code === 'Period') {

    e["target"] = "value";
    e["target"]["value"] = e.key;
    displayCurrentNumber(e);
    
  } else if (e.code === 'Backspace') {
    deleteNumber();
  } else if (e.code === 'Enter')  {
    operate();
  } else if (e.code === 'Delete') {
    clearAll();
  }
})