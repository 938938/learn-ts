"use strict";
const add = (a, b = 5) => a + b;
const printOutput = (output) => console.log(output);
const printOutput2 = (output) => console.log(output);
const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', (event) => console.log(event));
}
const person = {
    firstName: 'abc',
    age: 30,
};
const copiedPerson = Object.assign({}, person);
const add2 = (...numbers) => {
    numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedNumbers = add2(5, 10, 2, 3.7);
const Numbers = [1, 2, 3, 4, 5];
const [number1, number2, ...remainingNumbers] = Numbers;
const { firstName, age } = person;
//# sourceMappingURL=app.js.map