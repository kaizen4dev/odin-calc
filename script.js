function add(...args){
  return args.reduce((sum, num) => sum += num, 0);
}

function subtract(minuend, ...args){
  return args.reduce((diff, num) => diff -= num, minuend);
}

function mustiply(...args){
  return args.reduce((product, num) => product *= num, 1);
}

function divide(divident, ...args){
  return args.reduce((quotient, num) => quotient /= num, divident);
}
