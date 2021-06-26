const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
   // Replace current display value if first value is entered
   if(awaitingNextValue){
       calculatorDisplay.textContent = number;
       awaitingNextValue = false;
   } else {
    // if current display value is 0, replace it, if not add number
       const displayValue = calculatorDisplay.textContent;
       calculatorDisplay.textContent  = displayValue === '0' ? number : displayValue + number; 
   }
}
// Add Dismal 
function addDecimal(){
    // if operator pressed, don't add decimal
    if(awaitingNextValue) return;
    // if no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    } 
}

// Calculate first and second values dependent on operator
const calculate = {
  '/' : (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*' : (firstNumber, secondNumber) => firstNumber * secondNumber, 
  '+' : (firstNumber, secondNumber) => firstNumber + secondNumber, 
  '-' : (firstNumber, secondNumber) => firstNumber - secondNumber, 
  '=' : (firstNumber, secondNumber) => secondNumber, 
};

// Use operator
function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
   
    // Prevent multiple operators
    // if(operatorValue && awaitingNextValue) {
    //     operatorValue  = operator;
    //     return;
    // };

    // Assign firstValue if no value
    if(!firstValue){
        firstValue = currentValue;
    } else {
        console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        // console.log("Calculation:", calculation);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store opretor
        awaitingNextValue = true;
        operatorValue = operator;
    
    // Indication for what operator is using
        operatorIndicator(operator);
}

function operatorIndicator(operator){
    inputBtns.forEach(inputBtn => {
        if(inputBtn.value === operator){
                inputBtn.classList.add('red'); 
            } else {
                inputBtn.classList.remove('red');
        }
    })
}

// Add Events Listerns for numbers, operators, dicimal buttons
inputBtns.forEach(inputBtn => {
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => {sendNumberValue(inputBtn.value)})
    }else if (inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => {useOperator(inputBtn.value)})
    }else if (inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset all display values
function resetAll(){
    inputBtns.forEach(inputBtn => {
        inputBtn.classList.remove('red')
    });
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}
// Event listener
clearBtn.addEventListener('click', resetAll)