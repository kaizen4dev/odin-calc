// global variables
const input = document.querySelector(".display-area .input")

// main function
function main(){
  // listen for clicks
  addEventListener('mousedown', (event) => {
    // console.dir(event.target)

    // select target of our event, it's classes and text content
    const target = event.target;
    const classes = target.className;
    const text = target.textContent;

    // return early if target isn't button
    if(target.localName != "button") return;

    // remove default text
    input.textContent = input.textContent ==  "Your input" ? "" : input.textContent;

    // if backspace used remove last digit and return
    if(classes.includes("backspace")){
      removeLast()
      return;
    }

    // if clear used remove all symbols and return
    if(classes.includes("clear")){
      removeAll()
      return;
    }


    if(classes.includes("equals")){
      // call function to show result(doesn't exist yet)
      input.textContent = answer();
      return;
    }

    // if user wants to use operator, but last symbol is already an operator - remove it.
    if(classes.includes("operator") && lastIsOperator()){
      removeLast()
    }

    appendInput(text)    
  })
}

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

function answer(string){
  let expression = string || input.textContent
  let nums = expression.split(/\D/).map(num => Number(num));
  let operators = expression.split(/\d/).filter(item => item != "");


  // frist we do multiplication/division...

  // Pseudo code //
  //
  // search for needed operators
  // a. if found - operate 2 numbers, one before and one after operator, push result to newNums
  // 1.a if nunber before operator(num[i]) is already used, pop it from newNums instead
  // 1.b otherwise proceed as planned
  // 2. delete used nums
  //
  // b. if not found 
  // 1. push operators to newOpers
  // 2. if number before operator isn't already used push it to newNums
  //
  // Extra: retrive lost number.

  let newOpers = [];
  let newNums = [];

  for(key in operators){
    // make life a little bit easier
    let operator = operators[key];
    let i = Number(key);

    // a.
    if(operator == "×" || operator == "÷"){
      // 1.a
      if(!nums[i]){
        newNums.push(operate(operator, newNums.pop(), nums[i+1]));
      // 1.b
      } else newNums.push(operate(operator, nums[i], nums[i+1]));
      // 2.
      delete nums[i];
      delete nums[i+1];

    // b.
    } else {
      // 1.
      newOpers.push(operator);
      // 2.
      if(nums[i]) newNums.push(nums[i]);
    }
  }
  // Extra
  // since expression has one more digit compared to it's operators, we lost one num
  // in loop above, lets bring it back(if it's valid)
  let lostNum = nums.pop();
  if(lostNum) newNums.push(lostNum);


  // Addition / subtraction
  nums = [...newNums]
  newOpers.forEach(operator => {
    let value = operate(operator, nums[0], nums[1]);
    nums.splice(0, 2, value);
  })

  return nums.join();
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

main();
