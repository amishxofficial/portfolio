let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

const currentDisplay = document.getElementById('current-op');
const previousDisplay = document.getElementById('previous-op');

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    previousDisplay.innerText = previousInput;
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) calculate();
    
    // Replace symbol for visual display
    let visualOp = op === '*' ? '×' : op === '/' ? '÷' : op;
    
    operator = op;
    previousInput = `${currentInput} ${visualOp}`;
    shouldResetScreen = true;
    updateDisplay();
}

function calculate() {
    if (operator === null || shouldResetScreen) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
       case '/': 
            if (curr === 0) {
                // 🛑 Popup ki jagah screen par "Error" dikhayenge
                currentInput = "Infinity"; 
                previousInput = `${prev} ÷ 0 =`;
                operator = null;
                shouldResetScreen = true;
                updateDisplay();
                return; // Function yahi rok do
            }
            result = prev / curr; 
            break;
        default: return;
    }

    // 🔥 Feature: Operation moves to top display with '=' sign
    let visualOp = operator === '*' ? '×' : operator === '/' ? '÷' : operator;
    previousInput = `${prev} ${visualOp} ${curr} =`;
    
    // Result becomes the main focus
    currentInput = result.toString();
    operator = null;
    shouldResetScreen = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetScreen = false;
    updateDisplay();
}

function deleteLast() {
    if (shouldResetScreen) return;
    currentInput = currentInput.toString().slice(0, -1);
    if (currentInput === '') currentInput = '0';
    updateDisplay();
}
// Keyboard Input Support
document.addEventListener('keydown', (e) => {
    // Numbers 0-9
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    
    // Operators
    if (e.key === '+') appendOperator('+');
    if (e.key === '-') appendOperator('-');
    if (e.key === '*') appendOperator('*');
    if (e.key === '/') {
        e.preventDefault(); // Browser search bar khulne se rokne ke liye
        appendOperator('/');
    }
    
    // Decimal point
    if (e.key === '.') appendNumber('.');
    
    // Equal / Enter
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    }
    
    // Backspace / Delete
    if (e.key === 'Backspace') deleteLast();
    
    // Clear (Escape key)
    if (e.key === 'Escape') clearDisplay();
});