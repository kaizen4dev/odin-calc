// global variables
const input = document.querySelector(".display-area .input")

function add(...args){
  return args.length >= 2 ? args.reduce((sum, num) => sum += num, 0) : null;
}

function subtract(minuend, ...args){
  return minuend ? args.reduce((diff, num) => diff -= num, minuend) : null;
}

function multiply(...args){
  return args.length >= 2 ? args.reduce((product, num) => product *= num, 1) : null;
}

function divide(divident, ...args){
  return args ? args.reduce((quotient, num) => quotient /= num, divident) : null;
}

function operate(operator, numOne, numTwo){
  switch(operator){
    case "+":
      return add(numOne, numTwo);
    case "-":
      return subtract(numOne, numTwo);
    case "×":
      return multiply(numOne, numTwo);
    case "÷":
      return divide(numOne, numTwo);
  }
}

// adds provided text to input
function appendInput(text){
  input.textContent = input.textContent ? input.textContent + text : text;
}

// check if last symbol of input is an operator
function lastIsOperator(){
  const last = input.textContent[input.textContent.length -1]
  if(last == "+" || last == "-" || last == "×" || last == "÷") return true;
  return false;
}

// removes last symbol of input
function removeLast(){
  input.textContent = input.textContent.slice(0, input.textContent.length - 1)
}

// removes all content of input
function removeAll(){
  input.textContent = ""
}
