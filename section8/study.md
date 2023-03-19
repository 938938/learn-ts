# 데코레이터

일종의 함수, 코드 조각을 장식해주는 역할
메소드나 클래스(& 클래스 내부의 생성자), 프로퍼티, 접근자, 메서드, 매개변수 위에 @(at)함수를 장식해 코드가 실행될 때 장식된 부분을 변경

- @ 기호는 타입스크립트에게 이것이 데코레이터임을 선언
  타입스크립트는 클래스 실행 시 데코레이터 함수를 플러그인 형태로 실행

메타프로그래밍에 유용하게 사용됨
보통 클래스에 적용되며, 관습적으로 대문자로 명명

데코레이터 함수는 target(현재 타겟), key(속성이름), descriptor(설명)을 인수로 받음

```ts
function Logger(constructor: Function) {
  console.log('Logging...');
  cosnole.log(constructor);
}

// 바로 아래에 위치하는 요소(Person Class)에 영향을 미침
@Logger
class Person {
  name = 'abc';
  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

/**
 * 콘솔에 출력되는 내용
*/
Loging...
class Person {
  constructor() {
    this.name = 'abc';
    console.log('Creating person object...');
  }
} // Loger함수 안에 있는 cosnole.log(constructor);
Creating person object...
Person {name:'abc'}
```

데코레이터는 실체화 되기 전 클래스가 정의만 되어도 실행 됨
(클래스를 실체화할 필요가 없음)
**데코레이터는 클래스를 정의할 때 실행**

#### experimentalDecorators

타입스크립트의 데코레이터는 실험적인 기능으로 빠져있기 때문에 사용하기 위해선 tsconfig.json에서 experimentalDecorators 옵션 활성화 필요
{
  "compilerOptions":{
    ...
    "experimentalDecorators": true;
  }
}

#### 데코레이터 호출 순서
프로퍼티 -> 메서드 -> 매개변수 -> 클래스

### 데코레이터 팩토리

데코레이터 함수를 감싸는 래퍼 함수
사용자로부터 인자를 전달 받도록 설정 가능

데코레이터가 런타임에 호출되는 표현식을 반환
(데코레이터 함수 실행x 데코레이터 함수를 반환할 함수 실행o)
데코레이터 선언에 적용되는 방식을 원하는 대로 바꾸고 싶을 때 사용

```ts
// 데코레이터 팩토리
function color(value: string) {
  // 데코레이터 함수
  return function (target:Function) {
    console.log(value);
    console.log(target)
  };
}
@color('야호')
class Red {}

/**
 * 콘솔에 출력되는 내용
*/
'야호'
[class Red]
```

### 데코레이터의 실행 흐름

데코레이터 팩토리는 위에서 아래로 실행,
데코레이터는 아래에서 위로 실행.

```ts
function first(){
  console.log('first팩토리')
  return function(target:any, props:string, desc:PropertyDescriptor){
    console.log('first데코레이터')
  }
}
function second(){
  console.log('second팩토리')
  return function(target:any, props:string, desc:PropertyDescriptor){
    console.log('second데코레이터')
  }
}

class Text {
  @first();
  @second();
}

/**
 * 콘솔 출력 결과
*/
first팩토리
second팩토리
second데코레이터
first데코레이터
```

## 속성 데코레이터

```ts
function readonly(writable: boolean) {
  return function (target: any, desc: any): any {
    return {
      writable: !writable,
    };
  };
}

class Test {
  property = 'property';
  @readonly(false)
  public test1 = 0;
  @readonly(true)
  public test2 = 0;
}
const test = new Test();
test.test1 = 1;
test.test2 = 1; // writable값이 false라서 오류 발생
```

## 데코레이터의 종류

어떤 데코레이터를 사용하느냐에 따라 어떤걸 반환하고 어떤 타입스크립트를 사용할 수 있는지 결정됨

뭔가를 반환할 수 있는 데코레이터는 메서드 혹은 접근자에 추가된 데코레이터
프로퍼티나 매개변수에 추가된 데코레이터도 어떠한 값을 반환하지만 타입스크립트가 인식하지 않음

### 클래스 데코레이터
기존의 클래스를 확장할 수 있음
매개변수로 클래스 생성자 자체를 받고 클래스를 반환함(반환값이 없을 수 있음)

```ts
function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
      }
    };
  };
}
```

### 메서드 데코레이터
데코레이터 중 가장 많이 사용됨
메서드의 Property Descriptor을 수정해 메서드를 확장
매개변수로 (클래스, 메서드 이름, 호출된 메서드로 정의된 메서드(프로퍼티 Descriptor))를 전달 받음

### 프로퍼티 데코레이터
프로퍼티의 설정을 변경할 수 있음
매개변수로 (클래스, 프로퍼티 이름)을 전달 받고 Property Descriptor 형식의 객체 반환
(getter / setter 설정 가능)

### 매개변수 데코레이터
매개변수 왼쪽 옆에 명시(가로로 사용해도 인식 가능)
매개변수로 (클래스, 매개변수가 들어있는 매서드 이름, 메서드 파라미터에서의 index)를 전달 받음

```ts
function exam(target: any, methodName: string, idx: number) {
  ...
}
class Test {
  constructor(name:string, @exam age:number){
    ...
  }
}
```


## 타당성 검증

유효성 검사용 데코레이터

```ts
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required'],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive'],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createdCourse);
});
```
