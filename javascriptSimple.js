let displayText = "";
let n1 ='';
let n2 = '';
let nCurrent = 0;
let opperator = "";

let accumulator = "";

let isSecondNumber = false;
let decimalUsed = false;

const oppSymbols = ['+','-','X','\u00F7'];
const calcDisplay = document.getElementById("display");
const decimalBtn = document.getElementById("btnDecimal");

disableOppButtons(true);
disableEqualButton(true);

//Functions for calculator opperations
function add(a, b) {
    return (parseFloat(a) + parseFloat(b)).toFixed(3);
    //return (a + b).toFixed(3);
}
function sub(a, b) {
    return (parseFloat(a) - parseFloat(b)).toFixed(3);
}
function mul(a, b) {
    return (parseFloat(a) * parseFloat(b)).toFixed(3);
}
function div(a, b) {
    return (parseFloat(a) / parseFloat(b)).toFixed(3);
}
function clear() {
    currentValue = 0;
}

function parseUserInput(input) {
    let opp = '';
    let num1 = '';
    let num2 = '';
    let oppIndex = 0;

    if(      input.indexOf('+') != -1) { oppIndex = input.indexOf('+'); }
    else if (input.indexOf('-') != -1) { oppIndex = input.indexOf('-'); }
    else if (input.indexOf('X') != -1) { oppIndex = input.indexOf('X'); } 
    else if (input.indexOf('\u00F7') != -1) { oppIndex = input.indexOf('\u00F7'); } 

    if(oppIndex) {
        let split = input.split(input[oppIndex]);
        [num1, num2] = [split[0], split[1]];

        opp = input[oppIndex];
    }

    displayText = operate(opp, num1, num2);
}

//function operate(opporator, num1, num2) {
function operate(operator, n1, n2) {
    if(!n2) {return parseFloat(n1); } //If equal pressed with single number

    console.log("Opp: " + operator);
    switch(operator)
    {
        case '+':
            console.log("add");
            return add(n1, n2);
            break;
        case '-':
            console.log("sub");
            return sub(n1, n2);
            break;
        case 'X':
            console.log("multiply");
            return mul(n1, n2);
            break;
        case '\u00F7':
            console.log("divide");
            return div(n1, n2);
            break;
    }
}

function setNumbers(oppSign) {
    if(n1 == "" ? n1 = nCurrent : n2 = nCurrent);
    nCurrent = '';
    opperator = oppSign;
    displayText += oppSign;
}

//Allow for oppButtons to be disabled after one opp is selected, and enabled after equals is pressed
function disableOppButtons(state){  //true-disabled, false-enabled    
    return;
    document.getElementById("btnAdd").disabled = state;
    document.getElementById("btnSubtract").disabled  = state;
    document.getElementById("btnMultiply").disabled  = state;
    document.getElementById("btnDivide").disabled  = state;
}

//Allow for equalButton to be disabled till an opp is selected
function disableEqualButton(state){ //true-disabled, false-enabled    
    return;
    document.getElementById("btnEqual").disabled = state;
}

//Store two numbers
function storeNumber(digit) {
    if(opperator === '') {n1 += digit; }
    else if(opperator != '') {n2 += digit; }
}

//Set display result after equals or second opperator
function setResult() {
    let result = operate(opperator, n1, n2);
    n1 = result;
    n2 = '';
    if(isNaN(result) || !isFinite(result)) {result = "ERROR :(";}
    displayText = result;

}

//Set opporators, preventing multiple opperators
function setOperator (opp) {
    if(!oppSymbols.some(x=>displayText.includes(x))) //https://stackoverflow.com/questions/76595410/determine-if-a-string-contains-any-of-an-array-of-characters
    { 
        opperator = opp;
        displayText += opperator
    }

    //Allow for decimal to be used for second number
    decimalBtn.disabled = false;
}

calcDisplay.addEventListener("input", (e) => {
    console.log("Change");
})

document.addEventListener("click", (e) => {
    let target = e.target;
    console.log(target.id);

    switch(target.id) {
        case 'btnClear':
            displayText = "";
            n1 = "";
            n2 = "";
            opperator = "";

            disableOppButtons(false);
            disableEqualButton(false)
            document.getElementById("btnDecimal").disabled = false;
            displayText = '';
            break;
        case 'btnDivide':
            disableOppButtons(true);
            disableEqualButton(false);
            if(opperator) { parseUserInput(displayText) };
            //if(n1 && n2) { setResult(); }
            setOperator('\u00F7');
            break;

        case 'btn7':
            storeNumber(7);
            displayText += '7';
            disableOppButtons(false);
            break;
        case 'btn8':
            storeNumber(8);
            displayText += '8';
            disableOppButtons(false);
            break;
        case 'btn9':
            storeNumber(9);
            displayText += '9';
            disableOppButtons(false);
            break;
        case 'btnMultiply':
            disableOppButtons(true);
            disableEqualButton(false);
            if(opperator) { parseUserInput(displayText) };
            //if(n1 && n2) { setResult(); }
            setOperator('X');
            break;

        case 'btn4':
            storeNumber(4);
            displayText += '4';
            disableOppButtons(false);
            break;
        case 'btn5':
            storeNumber(5);
            displayText += '5';
            disableOppButtons(false);
            break;
        case 'btn6':
            storeNumber(6);
            displayText += '6';
            disableOppButtons(false);
            break;
        case 'btnSubtract':
            disableOppButtons(true);
            disableEqualButton(false);
            if(opperator) { parseUserInput(displayText) };
            //if(n1 && n2) { setResult(); }
            setOperator('-');
            break;

        case 'btn1':
            displayText += '1';
            storeNumber(1);
            disableOppButtons(false);
            break;
        case 'btn2':
            displayText += '2';
            storeNumber(2);
            disableOppButtons(false);
            break;
        case 'btn3':
            displayText += '3';
            storeNumber(3);
            disableOppButtons(false);
            break;
        case 'btnAdd':
            //if(n1 && n2) { setResult(); }
            if(opperator) { parseUserInput(displayText) };

            setOperator('+');
            //opperator = '+';

            disableOppButtons(true);
            disableEqualButton(false);
            //displayText += opperator;

            break;

        case 'btn0':
            storeNumber(0);
            displayText += '0';
            disableOppButtons(false);
            break;
        case 'btnDecimal':
            if(!decimalUsed) {
                displayText += '.';
                decimalBtn.disabled = true;
            } else {
                decimalBtn.disabled = false;
            }
            //}           
            break;
        case 'btnEqual':
            //parseUserInput(displayText);

            //setResult();
            parseUserInput(displayText);
            
            decimalBtn.disabled = false;
            disableOppButtons(false);
            disableEqualButton(true);
            break;

        case 'btnDelete':
            displayText = displayText.slice(0,-1);
            break;

        default:
            return;
    }

    console.log("n1: " + n1 + " opp : " + opperator + " n2: " + n2);
    calcDisplay.textContent = displayText;
});