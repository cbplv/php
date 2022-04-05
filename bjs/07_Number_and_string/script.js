let lastOperand = null;
let operation = null;
let isCompleted = false;

const showOperation = document.querySelector('#showOperation');
const inputWindow = document.querySelector('#inputWindow');
const operandButtonsList = document.querySelectorAll('.operand');

function cLearInstance() {
    operation = null;
    lastOperand = null;
    isCompleted = false;
    showOperation.value = '';
}

function preSet(operation) {
    lastOperand = parseFloat(inputWindow.value);
    switch (operation) {
        case 'sum':
            showOperation.value = lastOperand + ' + ';
            break;
        case 'sub':
            showOperation.value = lastOperand + ' - ';
            break;
        case 'div':
            showOperation.value = lastOperand + ' / ';
            break;
        case 'mult':
            showOperation.value = lastOperand + ' * ';
            break;
    }    inputWindow.value = '';
    isCompleted = false;
}

function fillInputWindow(v) {
    if (isCompleted == true) {
        inputWindow.value = '';
        showOperation.value = '';
    }
    inputWindow.value += v;
    isCompleted = false;
};

for (let button of operandButtonsList) {
    button.addEventListener('click', () => fillInputWindow(button.innerText));
};

document.querySelector('#btn_sum').addEventListener('click', () => {
    operation = 'sum';
    preSet(operation);
})

document.querySelector('#btn_sub').addEventListener('click', () => {
    operation = 'sub';
    preSet(operation);
})

document.querySelector('#btn_div').addEventListener('click', () => {
    operation = 'div';
    preSet(operation);
})

document.querySelector('#btn_mult').addEventListener('click', () => {
    operation = 'mult';
    preSet(operation);
})

document.querySelector('#btn_sqrt').addEventListener('click', () => {
    operation = 'sqrt';
    isCompleted = false;
    showOperation.value = '\u221A';
})

document.querySelector('#btn_calc').addEventListener('click', () => {
    let result = 0
    try {
        showOperation.value += parseFloat(inputWindow.value) + ' = ';

        if (operation === 'sum') {
            result = lastOperand + parseFloat(inputWindow.value);
        }
        if (operation === 'sub') {
            result = lastOperand - parseFloat(inputWindow.value);
        }
        if (operation === 'div') {
            result = lastOperand / parseFloat(inputWindow.value);
        }
        if (operation === 'mult') {
            result = lastOperand * parseFloat(inputWindow.value);
        }
        if (operation === 'sqrt') {
            result = Math.sqrt(parseFloat(inputWindow.value));
        }
    }
    catch {
        inputWindow.value = 'error!';
    }
    finally {
        inputWindow.value = result;

        operation = null;
        lastOperand = null;
        isCompleted = true;
    }
})

document.querySelector('#btn_clr').addEventListener('click', () => {
    cLearInstance();
    inputWindow.value = '';
})