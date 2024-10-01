let currentValue = 0;
const doc = document.getElementById("document");

function add(a, b) {
    return (a + b).toFixed(3);
}

function sub(a, b) {
    return (a - b).toFixed(3);;
}

function mul(a, b) {
    return (a * b).toFixed(3);;
}

function div(a, b) {
    return (a / b).toFixed(3);;
}

function clear() {
    currentValue = 0;
}

function operate(opporator, num1, num2) {
    switch(opporator)
    {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return sub(num1, num2);
            break;
        case '*':
            return mul(num1, num2);
            break;
        case '/':
            return div(num1, num2);
            break;
        case 'clear':
            clear();s

    }
}

doc.getElementById("document").addEventListener("click", (e) => {
    let target = e.target;
    console.log(target.id);
});