const display = document.querySelector('#display');
// const buttons = document.querySelectorAll('button');
const clearButton = document.getElementById('btnclear');
const deleteButton = document.getElementById('btndel');
const equalButton = document.getElementById('btnequal');

const btn7 = document.getElementById('btn7');
const btn8 = document.getElementById('btn8');
const btn9 = document.getElementById('btn9');

const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn00 = document.getElementById('btn00');
const btn0 = document.getElementById('btn0');

//Click Button Numbers 1 to 9 and 0

btn7.addEventListener('click', () => {
    display.value += '7';
});

btn8.addEventListener('click', () => {
    display.value += '8';
});
btn9.addEventListener('click', () => {
    display.value += '9';
});

btn4.addEventListener('click', () => {
    display.value += '4';
}  );
btn5.addEventListener('click', () => {
    display.value += '5';
});
btn6.addEventListener('click', () => {
    display.value += '6';
});
btn1.addEventListener('click', () => {
    display.value += '1';
});
btn2.addEventListener('click', () => {
    display.value += '2';
});
btn3.addEventListener('click', () => {
    display.value += '3';
});

btn00.addEventListener('click', () => {
    display.value += '00';
});
btn0.addEventListener('click', () => {
    display.value += '0';
});

//Click BTN DEL and AC
deleteButton.addEventListener('click', () => {
    display.value = display.value.slice(0, -1);
});

clearButton.addEventListener('click', () => {
    display.value = '';
});

//Manage Operators
const operators = document.querySelectorAll('.operator');

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        display.value += operator.value;
    });
});

//Mathematics Calculation
equalButton.addEventListener('click', () => {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'Error';
    };
});