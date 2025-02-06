// global variables
const input = document.querySelector(".display-area .input");
let longPress;

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

    // backspace
    if(classes.includes("backspace")){
      // remove last symbol
      removeLast();
      // on long press remove full expression
      longPress = setTimeout(() => removeAll(), 250);
      return;
    }

    if(classes.includes("equals")){
      // call function to show result(doesn't exist yet)
      input.textContent = answer();
      return;
    }

    // if user wants to use operator, but last symbol is already an operator - remove it.
    if(classes.includes("operator") && lastIsOperator()){
      removeLast();
    }

    appendInput(text);
  })

  addEventListener('mouseup', () => {
    // cancel execution of code that was intended for long press
    // (if it wasn't executed already)
    clearTimeout(longPress);
  })
}

function answer(string){
  let expression = string || input.textContent;

  // handle brackets
  while(expression.includes("(")){
    // handle not closed brackets
    if(!expression.includes(")")) return null;

    // find beginning and end of brackets
    let open = Number(expression.indexOf("("));
    let close = Number(expression.indexOf(")"));

    // chop expression to parts
    let mid = expression.slice(open + 1, close);

    // handle brackets inside brackets...
    while(mid.includes("(")){
      // adding 1 beacuse mid is new string, which begins counting from
      // zero again, but we need index of original string
      open = open + Number(mid.indexOf("(") + 1); 
      mid = expression.slice(open + 1, close);
    }

    let start = expression.slice(0, open);
    let end = expression.slice(close + 1);

    // update expression
    expression = start + answer(mid) + end;
  }

  let newExpr = expression.split(" ");
  let nums = newExpr.filter(item => !isOperator(item));
  let operators = newExpr.filter(item => isOperator(item));

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
  nums = newNums.slice();
  newOpers.forEach(operator => {
    let value = operate(operator, nums[0], nums[1]);
    nums.splice(0, 2, value);
  })

  return nums.join();
}

function operate(operator, numOne, numTwo){
  numOne = Number(numOne);
  numTwo = Number(numTwo);
  switch(operator){
    case "+":
      return numOne + numTwo;
    case "-":
      return numOne - numTwo;
    case "×":
      return numOne * numTwo;
    case "÷":
      return numOne / numTwo;
  }
}

function isOperator(item){
  return item == "+" || item == "-" || item == "×" || item == "÷";
}

// adds provided text to input
function appendInput(text){
  input.textContent = input.textContent ? input.textContent + text : text;
}

// check if last symbol of input is an operator
function lastIsOperator(){
  const last = input.textContent[input.textContent.length -1];
  return isOperator(last);
}

function getLast(){
  return input.textContent[input.textContent.length -1];
}

// removes last symbol of input
function removeLast(){
  input.textContent = input.textContent.slice(0, input.textContent.length - 1);
}

// removes all content of input
function removeAll(){
  input.textContent = "";
}

main();
