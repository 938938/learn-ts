# 고급 타입

## 인터섹션 타입

& 사용
인터섹션 타입을 사용해 다른 타입과 결합할 수 있음

```ts
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
  // 자바스크립트에 내장된 Date 객체를 지원하는 타입
};

type ElevatedEmployee = Admin & Employee;
// interface ElevatedEmployee extends Employee, Admin {}
```

인터페이스 상속과 밀접한 관련을 가지고 있음(비슷하게 기능함)
인터섹션 타입은 어떤 타입과도 함께 사용할 수 있음(타입이 교차하게 구현 가능)

```ts
// 문자열이 될 수도 숫자형이 될 수도 있음
type Combinable = string | number;
// 숫자형이 될 수도 불리언이 될 수도 있음
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
// Universal은 숫자형 타입으로 간주됨
```

## 타입 가드

유니언 타입을 보조, 런타임시 코드가 정확하게 작동할 수 있게 함
타입을 명확히 구분하기 위해 사용

```ts
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    // 해당 if문의 조건을 타입 가드라고 볼 수 있음
    return a.toString() + b.toString();
  }
  return a + b;
}
```

typeof / if('속성' in 매개변수) / instanceof 등의 방법을 사용

#### instanceof

클래스를 사용해 작업하는 경우의 타입가드
(인터페이스는 자바스크립트로 컴파일 되지 않기 때문에 인터페이스에선 사용 불가능)
객체가 클래스에 기반하는지 확인 가능

```ts
type Vehicle = Car | Truck;

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}
```

## 구별된 유니언

타입가드를 쉽게 구현할 수 있게 해주는 유니언 타입
클래스, 인터페이스 모두 사용 가능
유니언을 구성하는 모든 객체에 하나의 공통 속성 부여, 해당 속성을 사용해 객체를 구분하는 방법

```ts
interface Bird {
  // 굳이 이름이 type 일 필요는 없음
  type: 'bird';
  flyingSpeed: number;
}
interface Horse {
  type: 'horse';
  runningSpeed: number;
}
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
}
```

## 형 변환

타입스크립트가 직접 감지하지 못하는 특정 타입의 값을 타입스크립트에 알려주는 역할
타입스크립트는 HTML 파일을 분석하지 못하기 때문에, getElementByID 등의 경우 HTML 요소나 null로 추론

```ts
const userInputElement = document.getElementById('user-input');
userInputElement.value = 'Hi thete!';
// 이 경우, 타입스크립트는 value가 HTML 타입에 존재하지 않는다고 봄
```

### 홀화살괄호 형 변환

변환하고자 하는 요소의 앞이나 타입스크립트에 타입을 알려주고자 하는 위치 앞에 <코드의 타입> 추가

```ts
const userInputElement = <HTMLInputElemnet>(
  document.getElementById('user-input')
);
```

빌드 도구와 리액트로 구문 분석되어 결과적으로 화면에 렌더링하고자 하는게 무엇인지 알아내는데에 사용
(현재 사용 중인 타입에 대한 정보 전달 목적이 아님)

### as 키워드 사용

형 변환하고자 하는 타입 다음에 as 키워드 입력, 어떤 타입으로 변환할 지 입력
홀화살괄호형은 타입스크립트와 완전히 분리되어 있음, JSX구문과의 충돌을 막기 위한 대안

```ts
const userInputElement = document.getElementById(
  'user-input'
) as HTMLInputElement;
```

홀화살괄호형 / as 키워드 중 선호하는 방식 사용
** 프로젝트 전체에서 일관성 유지 필요함 **

#### ! 느낌표

느낌표 앞의 표현식을 null로 반환하지 않을 것을 타입스크립트에 인식
null을 반환할 수 있는 dom에서 무언가를 선택하는 경우, 해당 요소가 null을 반환하지 않을 것을 확신하는 경우 사용
(확신하지 못한다며 if문 사용)

## 인덱스 속성

객체가 지닐 수 있는 속성에 대해 보다 유연한 객체를 생성할 수 있게 해주는 기능
값 타입에 대해 명확한 객체, 몇 개의 속성을 가질지 어떤 속성이 어떤 이름을 가질지 미리 알 수 없는 경우 사용
특정 타입으로 해석할 수 있는 속성 이름을 지녀야 하며 해당 속성에 대한 값 역시 해당 타입이어야 한다는 것만 입력
사전 정의된 속성 추가 가능(같읕 타입일 경우에만 가능)

```ts
interface ErrorContainer {
  // 이메일과 유저네임에 제한되지 않고 어떤 양식에서든 사용할 수 있도록 구현
  // prop이 아니라 key 등 다른 이름을 사용할 수 있음
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!',
};
```

## 함수 오버로드

동일한 함수에 대해 여러 함수 시그니처를 정의할 수 있는 기능
다양한 매개변수를 지닌 함수를 호출하는 여러 방법을 사용, 함수 내에서 작업을 수행할 수 있게 함
함수에 다양한 반환값이 있는 경우, 어떤 타입을 반환할 지 미리 지정
함수 위에 같은 이름을 입력해 사용, 함수 정보와 함수 선언을 하나로 병합하여 정보를 결합

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
// 함수 오버로드. 입력값에 따른 반환타입을 입력.
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('Max', ' Schwarz');
result.split(' ');
// result의 결과값이 spring타입임을 타입스크립트가 알고 있기 때문에 split 메소드 사용 가능
```

## 선택적 체이닝

정의되어 있는지 여부가 확실하지 않은 요소 다음에 물음표 추가
(타입스크립트 3.7 버전 이상에서만 지원)
객체 데이터의 중첩된 속성과 객체에 안전하게 접근할 수 있게 함
데이터에 접근하기 전에 데이터의 존재 여부를 확인하는 if문으로 컴파일됨

```ts
const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', description: 'My own company' },
};

console.log(fetchedUserData?.job?.title);
```

## null 병합

null 데이터 처리에 사용
이중 물음표 연산
null이거나 undefined이라면 폴백을 사용해야 한다는 의미
(0이나 ''(빈문자열)은 값으로 사용)

```ts
const nullUndefined = undefined;
const storedData = nullUndefined ?? 'DEFAULT';
console.log(storedData); // DFAULT

const falsy = '';
const storedData = falsy ?? 'DEFAULT';
console.log(storedData); // ''
```
