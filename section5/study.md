# 클래스 & 인터페이스

## 클래스란

객체의 청사진
데이터를 저장하고 메소드를 실행하기 위해 메소드를 저장하는데 사용하는 데이터 구조
클래스를 통해 객체의 형태, 포함해야 하는 데이터를 지정
클래스를 기반으로 객체를 만들면 어떤 메소드가 필요한지 정이할 수 있기 때문에 이를 클래스 내의 인스턴트라고 부름
객체 : 클래스 내의 인스턴스

## 클래스 만들기

관례적으로 클래스임을 명확히 하기 위해 첫글자는 대문자로 사용

```ts
class Department {
  name: string;
  constructor(n) {
    this.name = n;
  }
}
```

constructor : 생성자 메서드, 예약어
클래스와 연결되어 객체가 생성되면서 실행, 객체에 대한 초기화 작업을 수행

```ts
const accounting = new Department('Accounting');
console.log(accounting);
// Department {name:"Accounting"}
```

## 생성자 함수 및 'this' 키워드

this는 일반적으로 생성된 클래스의 구체적인 인스턴스를 참조

```ts
class Department {
  name: string;
  constructor(n) {
    this.name = n;
  }

  describe() {
    console.log`Department : ${name}`;
    // 이 경우 describe 메소드 내부 또는 클래스 외부의 전역 변수로 존재하는 변수 이름을 찾음
    console.log(`Department : ${this.name}`);
    // this : 클래스 내부의 클래스 속성이나 메소드 참조
  }
}
```

```ts
const accountingCopy = { describe: accounting.describe };
accoutingCopy.describe();
// 이 경우, 참조할 this.name이 없기 때문에 `Department : undefined`가 출력
```

이러한 원치않은 작동을 방지하기 위해 this를 호출하는 describe 메소드에 매개변수 추가
this를 매개변수로 추가하면, 타입스크립트가 this가 어디서 참조되어야 하는건지를 인식

```ts
  // Department 클래스에 기반한 인스턴트를 참조해야 함을 인식
  describe(this:Department) {
    console.log(`Department : ${this.name}`);
  }
...
// 이름속성을 추가해야 하며, 추가하지 않으면 오류 발생
const accountingCopy = { name:'DUMMY', describe : accounting.describe };
accoutingCopy.describe();
// Department : DUMMY
```

## 개인 및 공용 액세스 수정자

클래스를 사용하는 방법은 확실한 한 가지로 정하고 다른 방법은 사용하지 않도록 해야 함

```ts
class Department {
  ...
  // private : employees를 생성된 객체 내부에서만 접근 가능한 속성으로 변경
  private employees: string[] = [];

  ...

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
}
```

클래스 외부에서 다른 방법을 통해 접근하는 것을 막아야 하는 경우, private 키워드 사용
private : 생성된 객체 내부에서만 접근할 수 있는 속성으로 변경
( public : 기본값으로 지정된 속성, 외부에서 접근 가능 )

## 약식 초기화

속성과 필드가 생성자에서 초기화되는 클래스의 경우 이중 초기화 코드를 입력하는 대신 필드 정의 제거

```ts
class Department {
  // private id: string;
  // private name: string;
  private employees: string[] = [];

  // 생성자 함수
  constructor(private id: string, public name: string) {
    // 생성자에서 인수를 가져올 뿐 아니라 해당 클래스에 대해 정확히 동일한 이름의 속성을 만드는 명시적인 명령

    // this.id = id;
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Department : ${this.id} ${this.name}`);
  }
...
}
```

## 읽기 전용 속성

readonly. 초기화 후에 변경되어서는 안되는 특정 필드가 있는 경우 사용
ex) id
초기화 중 한 번만 사용 가능

```ts
class Department {
  ...
  constructor(private readonly id: string, public name: string) {

  }
...
}
```

private, public, readonly 는 타입스크립트에만 있는 속성, Javascript에는 존재하지 않음
메소드는 생성자 함수의 프로토타입에 추가

> 프로토타입이 무엇인지 알아볼 것\*\*\*\*
> 타입스크립트는 주로 클래스로 작업하기 때문에 프로토타입을 비교적 덜 사용함

## 상속

기본 클래스에서 보다 더 자세한 정보가 필요한 경우(고유의 특정 속성과 메소드를 가져야 하는 경우) 사용
클래스를 생성할 때 extends를 사용, 기본 클래스의 속성을 상속해서 확장

- super : 기본 클래스의 생성자를 호출할 때 사용
  클래스에 다른 속성을 할당하려면 super을 먼저 호출해야 함
  생성자에서 super을 먼저 호출한 다음 this 키워드 사용

```ts
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string) {
    super(id, 'IT');
    // super : Department의 생성자를 호출
    // 생성자에서 super을 먼저 호출한 다음 this 키워드를 사용하여 작업을 수행해야 함.
    this.admins = admins;
  }
}
```

## 속성 및 '보호된' 수정자 재정의

기본 클래스의 메소드나 속성 재정의 가능
private 속성은 정의된 클래스 내에서만 접근 가능, 해당 클래스를 상속받은 클래스에선 접근불가능
이를 접근 가능하면서 외부에선 변경 불가능한 속성으로 만들 때 protected 속성 부여
protected : private와 비슷한 기능. But 클래스를 상속한 클래스에서도 사용 가능.

```ts
class Department {
  protected employees: string[] = [];
...
}

class AccountingDepartment extends Department {
  constructor(id:string, private reportes:string[]){
    super(id, 'Accounting');
  }
  addEmployee(name:string){
    this.employees.push(name)
  }
}
```

\*\* 기본 클래스의 메소드를 무시 가능
고유의 구현을 추가하여 기본 클래스 대신 새롭게 추가한 구현을 적용시킬 수 있음

## 게터 & 세터

로직을 캡슐화하고 속성을 읽거나 설정하려 할 때 실행되어야 하는 로직을 추가할 때 사용

### 게터 : get 키워드 사용

값을 가지고 올 때 함수나 메소드를 실행하는 속성
private로 지정된 값에 접근할 수 있음
개발자가 더 복잡한 로직을 추가할 수 있게 해줌
일반적으로 접근을 제어하는 속성과 깊은 관련이 있음
반드시 무언가를 반환하도록 작성(반드시 return 필요)

```ts
class AccountingDepartment extends Department {
  private lastReport:string;

  get mostRecentREport(){
    if(this.lastReport){
      return this.lastReport;
    }
    throw new Error('No report found.')
  }

  constructor(id:string, private reportes:string[]){
    super(id, 'Accounting');
    this.lastReport = reports[0]
  }
...
}
const accounting = new AccountingDepartment('d2',[]);
console.log(accounting.mostRecentReport)
// 함수가 아닌 속성으로 접근하기 때문에 괄호쌍 입력하지 않음
```

### 세터 : set 키워드 사용

```ts
class AccountingDepartment extends Department {
  private lastReport:string;

  get mostRecentReport(){
    if(this.lastReport){
      return this.lastReport;
    }
    throw new Error('No report found.')
  }

  set mostRecentReport(value:string){
    if(!value){
      throw new Error('Please pass in a valid value!')
    }
    this.addReport(value)
  }
...
}
const accounting = new AccountingDepartment('d2',[]);
accounting.mostRecentReport = ''; // 없는 값으로 취급되므로 지정한 에러 발생
```

## 정적 메서드 & 속성

### static

정적 메서드와 속성을 사용, 클래스의 인스턴스에서 접근할 수 없는 속성과 메소드를 추가할 수 있음
새 키워드 없이 직접 클래스에서 호출(새 클래스 이름을 먼저 호출하지 않고 클래스에 직접 접근)
논리적으로 그룹화하거나 클래스에 매핑하려는 유틸리티 함수 혹은 클래스에 저장하고자 하는 전역상수에 사용

ex) Math ( 사용하기 위해 new Math 를 할 필요가 없음 )

```ts
class Department {
  // 정적 속성
  static fiscalYear = 2023;
  ...
  // 정적 메서드
  static createEmployee(name:string){
    return {name:name}
  }
}

const newEmployee = Department.createEmployee('Abc')
```

클래스를 그룹화 메커니즘으로 사용하기
클래스에 추가할 때 정적이 아닌 부분들에서는 접근할 수 없음

```ts
// ex
constructor(...){
  console.log(this.fiscalYear) // 오류 발생
  console.log(Department.fiscalYear) // 실행
}
```

생성자는 static 속성으로 변경 불가능
정적 속성과 정적 메서드의 전체적인 개념은 인스턴트와 분리되어 있음

## 추상 클래스

abstract
정의만 있을 뿐 몸체(body)가 구현되어있지 않은 클래스(확장될 수 있음)
추상 메소드는 추상 클래스에서만 사용할 수 있기 때문에, 추상 메서드가 하나 이상이라면 클래스에도 추상 속성 필요
해당 메서드는 어떤 클래스로든 구현되어야 함

```ts
abstract class Department {
  ...
  // 추상 메서드
  abstract describe(this:Department) : void;
}

class AccountingDepartment extends Department {
...
  describe() {
    console.log(this.id)
  }
}
```

일부 상위 클래스를 기반으로 하는 몯느 클래스가 일부 공통 메서드 또는 속성을 공유하도록 하려는 경우 사용
abstract 키워드로 표기된 클래스는 자체적으로 인스턴스화 할 수 없음

## 싱글톤 & 개인 생성자

private 생성자
싱글톤 : 특정 클래스의 인스턴스를 정확히 하나만 갖도록 함
정적 메소드나 속성을 사용할 수 없거나 사용하지 않고자 하는 동시에 항상 클래스를 기반으로 정확히 하나의 객체만 가지도록 하는 경우 유용

```ts
class AccountingDepartment extends Department {
  // 싱글톤 생성자 지정
  private constructor(id:string, private reports:stirng[]){
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }
...
}

const accounting = new AccountingDepartment('d2',[]);
// 생성자가 Private로 지정되었다는 에러 발생
```

private 속성이기 때문에 클래스 내에서만 접근 가능
정적 메서드 사용(클래스 자체에 정적 메서드 호출)

```ts
class AccountingDepartment extends Department {
  private static instance:AccountingDepartment;
...
  // 해당 클래스가 이미 생성되었는지 아닌지 확인
  static getInstance(){
    // 이미 인스턴스를 가지고 있다면 해당 인스턴스를 반환
    if(AccountingDepartment.instance){
      return this.instance
    }
  }
  // 아니면 새 인스턴스 생성
  this.instance = new AccountingDepartment('d2',[]);
  return this.instance
}

const accounting = AccountingDepartment.getInstance()
```

## 클래스와 인터페이스 사용

### 인터페이스

객체의 구조, 형태 정의
(구체적인 값을 지정하지 않음)
관례적으로 첫글자는 대문자로 생성
(인터페이스는 인스턴스화 할 수 없으면 컴파일 되지 않는 반면 클래스는 인스턴스화 할 수 있으면 컴파일 됨)

```ts
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
  // 인수의 이름과 타입, 반환 타입
}

let user1: Person;
user1 = {
  name: 'ABC',
  age: 20,
  greet(phrase: string) {
    console.log(phrase);
  },
};
```

#### 타입과 인터페이스

```ts
type Person = {
  name: string;
  age: number;

  greet(phrase: string): void;
};
```

인터페이스를 타입으로 바꿔 위 코드를 사용해도 오류는 발생하지 않음
인터페이스는 객체의 구조를 설명하기 위해서만 사용

```ts
interface Greetable {
  name: string;
  greet(phrase: string): void;
}

// 상속과 달리 여러 개의 인터페이스를 구현할 수 있음
class Person implements Greetable, AnotherInterface {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string) {
    console.log(phrase);
  }
}
```

인터페이스는 주로 구체적인 구현이 아닌 서로 다른 클래스간의 기능을 공유하기 위해 사용
인터페이스는 구현이나 값을 입력하지 않고 구조와 클래스가 가져야 하는 기능을 보유
(추상클래스 : 구체적인 구현 부분과 추상적인 부분을 혼합하여 사용 가능)

클래스가 특정 메서드를 지니고 있으며, 다른 클래스도 그 메서드를 가지고 있는지 확인하고자 할 때 해당 메서드가 존재하게 해주는 인터페이스를 구현
쉽게 클래스 간에 기능 공유 가능

### 읽기 전용 인터페이스 속성

인터페이스 내에서 readonly 속성 추가 가능
(public, private는 사용 불가능)

### 인터페이스 확장

extends를 사용하여 인터페이스 확장 가능

```ts
interface Named {
  readonly name: string;
}
interface Greetable extends Named {
  greet(phrase: string): void;
}
// 이 경우 Greetable 인터페이스를 사용할 경우 greet 함수 뿐 아니라 name 속성 구현도 요구됨
```

둘 이상의 여러 인터페이스를 하나의 인터페이스로 병합할 수 있음
(클래스와 상속의 경우 하나의 클래스로부터만 상속이 가능함(다수 사용 불가능))

### 함수 타입의 인터페이스

인터페이스로 함수의 구조 정의 가능

```ts
type AddFn = (a: number, b: number) => number;

interface AddFn {
  (a: number, b: number): number;
}
```

인터페이스로 정의한 함수를 사용할 때는 익명 함수 사용

```ts
let add: AddFn;
add = (a: number, b: number) => {
  return a + b;
};
```

## 선택적 매게변수, 속성

인터페이스와 클래스에서는 선택적 속성 정의 가능
속성의 뒤에 ? 추가 => 인터페이스를 구현하는 클래스 내에 해당 속성이 있을 수 있지만 반드시 그렇지는 않다는 것을 의미(있을 수도 없을 수도 있음)

```ts
interface Named {
  name: string;
  outputName?: string;
}
```

인터페이스에서 선택적 속성을 입력, 킄ㄹ래스에서는 선택적이지 않은 속성으로 구현했다면 로직이 항상 초기화되도록 해야 함

```ts
interface Named {
  name?: string;
}
class Person implements Named {
  name: string;
  constructor(n: string) {
    this.name = n;
    if (n) {
      this.name = n;
    }
  }
}
```
