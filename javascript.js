let displayText = "";
let n1 ='';
let n2 = '';
let nCurrent = 0;
let opperator = "";

let accumulator = 0;

let isSecondNumber = false;
let decimalUsed = false;

const oppSymbols = ['+','-','X','\u00F7'];
const calcDisplay = document.getElementById("display");
const decimalBtn = document.getElementById("btnDecimal");

let resultVisible = false;

disableOppButtons(true);
disableEqualButton(true);

//Functions for calculator opperations
function add(a, b) {
    let result = parseFloat(a) + parseFloat(b);
    if(parseInt(result)) {return result}
    else { return result.toFixed(2)}
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
    let result = 0;
    if(!n2) {
        result = parseFloat(n1);   //If equal pressed with single number
        displayText = result; 
    }
    else
    {
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

//Allow for all buttons except cancel to be disabled
function disableButtons(state){  //true-disabled, false-enabled    
    document.getElementById("btnAdd").disabled = state;
    document.getElementById("btnSubtract").disabled  = state;
    document.getElementById("btnMultiply").disabled  = state;
    document.getElementById("btnDivide").disabled  = state;

    document.getElementById("btn1").disabled = state;
    document.getElementById("btn2").disabled = state;
    document.getElementById("btn3").disabled = state;

    document.getElementById("btn4").disabled = state;
    document.getElementById("btn5").disabled = state;
    document.getElementById("btn6").disabled = state;

    document.getElementById("btn7").disabled = state;
    document.getElementById("btn8").disabled = state;
    document.getElementById("btn9").disabled = state;

    document.getElementById("btn0").disabled = state;
    document.getElementById("btnDecimal").disabled = state;
    document.getElementById("btnDelete").disabled = state;
    document.getElementById("btnEqual").disabled = state;
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
    // if(!oppSymbols.some(x=>displayText.includes(x))) //https://stackoverflow.com/questions/76595410/determine-if-a-string-contains-any-of-an-array-of-characters
    // { 
    //     opperator = opp;
    //     displayText += opperator
    // }

    // //Allow for decimal to be used for second number
    // decimalBtn.disabled = false;
}

function setDisplay(n1, opp, n2) {
    displayText = n1 + opp + n2;
    calcDisplay.textContent = displayText;
}

function tryParseExpression(expression){
    let isNegative = false;
    console.log("exp1: " + expression);
    if(expression[0] === '-') {     //If negative number, remove sign before expression is processed
        isNegative = true;
        expression = expression.substring(1); 
    }
    console.log("exp2: " + expression);
    console.log("neg: " + isNegative);
    if(      expression.indexOf('+') != -1) { oppIndex = expression.indexOf('+'); }             //Determine positon of opperator
    else if (expression.indexOf('-') != -1) { oppIndex = expression.indexOf('-'); }
    else if (expression.indexOf('X') != -1) { oppIndex = expression.indexOf('X'); } 
    else if (expression.indexOf('\u00F7') != -1) { oppIndex = expression.indexOf('\u00F7'); }
    else{   //If no operater, return number
        if(parseFloat(expression)) {
            return isNegative ? parseFloat('-' + expression) : parseFloat(expression);
        } else { return isNegative ? parseInt('-' + expression) : parseInt(expression) }
    }   

    let n1 = expression.substring(0, oppIndex);
    let opp = expression[oppIndex];
    let n2 = expression.substring(oppIndex + 1);

    if(isNegative) {n1 = '-' + n1; isNegative = false;}    //Replace negative sign for calculation

    if(!n2) { return n1; }  //Return first number if second number is not entered
    let result = operate(opp, n1, n2);

    if(result.length > 18) {         //Limit result to 18 character display.
        disableButtons(true); 
        return 'ERROR: MEMORY'; }    
    else if(!isFinite(result)) {     //Not infinate (divide by zero)
         if(isNaN(result)){          //Is a number
            disableButtons(true); 
            return 'ERROR: NaN';}
         else {                      
            disableButtons(true); 
            return 'ERROR: INFINITY';}
    }
    else { 
        return parseFloat(result) ? parseFloat(result).toFixed(2) : parseInt(result);   //If decimal, display to two places, else display as integer 
    }
}

//Set character on display (18 characters)
function setCharacter(character) {
    if(calcDisplay.textContent.length < 18) { calcDisplay.textContent += character };
    console.log(calcDisplay.textContent.length);
}

calcDisplay.addEventListener("input", (e) => {
    console.log("Change");
})

document.addEventListener("click", (e) => {
    let target = e.target;
    console.log(target.id);

    switch(target.id) {
        case 'btnClear':
            calcDisplay.textContent = '';
            disableButtons(false);
            break;
        case 'btnDivide':
            calcDisplay.textContent = tryParseExpression(calcDisplay.textContent);
            opperator = '\u00F7';
            calcDisplay.textContent += '\u00F7';
            break;

        case 'btn7':
            setCharacter('7');
            break;
        case 'btn8':
            setCharacter('8');
            break;
        case 'btn9':
            setCharacter('9');
            break;
        case 'btnMultiply':
            calcDisplay.textContent = tryParseExpression(calcDisplay.textContent);
            opperator = 'X';
            calcDisplay.textContent += 'X';
            break;

        case 'btn4':
            setCharacter('4');
            break;
        case 'btn5':
            setCharacter('5');
            break;
        case 'btn6':
            setCharacter('6');
            break;
        case 'btnSubtract':
            calcDisplay.textContent = tryParseExpression(calcDisplay.textContent);
            calcDisplay.textContent += '-';
            break;

        case 'btn1':
            setCharacter('1');
            break;
        case 'btn2':
            setCharacter('2');
            break;
        case 'btn3':
            setCharacter('3');
            break;
        case 'btnAdd':
            calcDisplay.textContent = tryParseExpression(calcDisplay.textContent);
            calcDisplay.textContent += '+';
            decimalBtn.disabled = false;
            break;

        case 'btn0':
            setCharacter('0');
            break;
        case 'btnDecimal':
            if(!decimalUsed) {
                setCharacter('.');
                decimalBtn.disabled = true;
            } else {
                decimalBtn.disabled = false;
            }
            break;
        case 'btnEqual':
            calcDisplay.textContent = tryParseExpression(calcDisplay.textContent);
            break;

        case 'btnDelete':
            if(calcDisplay.textContent.slice(-1) === '.') { decimalUsed = false; decimalBtn.disabled = false;}
            console.log(calcDisplay.textContent.slice(-1));
            calcDisplay.textContent = calcDisplay.textContent.slice(0, -1);
            break;

        default:
            return;
    }

    console.log("n1: " + n1 + " opp : " + opperator + " n2: " + n2);
});

//Listen for keyboard events
document.addEventListener("keyup", (e) => {
    let key = e.key; 
    let btnOption = '';
    console.log(key);

    switch(key) {
        case '1':
            document.getElementById("btn1").click();
            break;
        case '2':
            document.getElementById("btn2").click();
            break;
        case '3':
            document.getElementById("btn3").click();
            break;
        case '4':
            document.getElementById("btn4").click();
            break;
        case '5':
            document.getElementById("btn5").click();
            break;
        case '6':
            document.getElementById("btn6").click();
            break;
        case '7':
            document.getElementById("btn7").click();
            break;
        case '8':
            document.getElementById("btn8").click();
            break;
        case '9':
            document.getElementById("btn9").click();
            break;
        case '0':
            document.getElementById("btn0").click();
            break;
        case '.':
            document.getElementById("btn0").click();
            break;

        case '+':
            document.getElementById("btnAdd").click();
            break;
        case '-':
            document.getElementById("btnSubtract").click();
            break;
        case '*':
            document.getElementById("btnMultiply").click();
            break;
        case '/':
            document.getElementById("btnDivide").click();
            break;
        case '=':

        case 'Enter' : //Enter
            document.getElementById("btnEqual").click();
            break;
        case 'Backspace' : //Delete
            document.getElementById("btnDelete").click();
            break;
        case 'Delete' : //Clear
            document.getElementById("btnClear").click();
            break;

        default:
            return;
    }
})