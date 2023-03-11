// Code goes here!
// 자바스크립트와 ts
const add = (a: number, b: number = 5) => a + b;
const printOutput = (output: string | number) => console.log(output);
const printOutput2: (output: string | number) => void = (output) =>
  console.log(output);
// 인수를 감싼 괄호 쌍은 (하나일 경우) 생략 가능
// 타입 배정은 생략할 수 없다

const button = document.querySelector('button');

if (button) {
  button.addEventListener('click', (event) => console.log(event));
}

const person = {
  firstName: 'abc',
  age: 30,
};

const copiedPerson = { ...person };

const add2 = (...numbers: number[]) => {
  numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addedNumbers = add2(5, 10, 2, 3.7);

const Numbers = [1, 2, 3, 4, 5];

const [number1, number2, ...remainingNumbers] = Numbers;

const { firstName, age } = person;

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];
