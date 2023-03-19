### 타입 지정

```ts
let a = 'hello'; // 타입 추론
let b: boolean = false; // 타입 지정(명시적)
```

보통은 a처럼 타입추론을 많이 사용함
(쉽고 코드가 짧아 가독성이 좋음)

```ts
let c = [1, 2, 3];
c.push('hello'); // 보통 배열은 같은 값이 들어가기 때문에 오류 발생
let d: number[] = [];
```

빈 배열 등 타입스크립트가 타입을 추론할 수 없는 경우 명시적 표현도 유용함

- 명시적 표현은 최소한으로 사용하는게 좋음(타입스크립트가 추론하도록 두는게 좋음)

### 선택적 타입, Alias 타입

```ts
const player: {
  name: string;
  age?: number;
} = {
  name: 'abc',
};
```

구성요소를 선택적으로 하고 싶을 때 ? 사용 - 선택적 변수 사용
(? 가 없을 경우, player에 age값이 없기 때문에 오류 발생)
if(player.age < 10) 의 조건문을 쓸 경우, player.age의 값이 undefined일 수 있어 오류 발생
if(player.age && player.age < 10) 처럼 age값이 있는지 확인 절차를 거쳐야 함

```ts
type Player = {
  name: string;
  age?: number;
};

const player1: Player = {
  name: 'abc',
};
const player2: Player = {
  name: '123',
  age: 10,
};
```

```ts
function playerMaker(name: string): Player {
  return {
    name,
  };
}
const playerMaker2 = (name: string): Player => ({ name });
const aaa = playerMaker('aaa');
aaa.age = 20;
```

### readonly속성(읽기 전용)

```ts
type Player = {
  readonly name: string;
  age?: number;
};
```

해당 값을 수정할 수 없게 함

### Tuple

Tuple : 정해진 길이를 지닌, 특정 위치에 특정 타입이 있어야 하는 Array 생성.

```ts
const player: [string, number, boolean] = ['abc', 1, true];
```

### Any

비어있는 값을 정할 경우 타입스크립트가 추론하는 타입
타입스크립트로부터 빠져나오고 싶을 때 사용(어떤 타입도 될 수 있음)
타입스크립트를 사용하는 의미가 없어지기 때문에 사용을 지양함

### unknown

변수의 타입을 지정하지 못할 때 사용
unknown을 지정한 변수를 사용하기 위해서는 타입 확인이 필요함

```ts
let a: unknown;
if(typeof a === 'number){
  let b = a+1
}
```

### void

아무것도 return하지 않는 함수에 사용
보통 따로 지정해줄 필요 없음(return값이 없으면 자동으로 추론)

```ts
const hello = (): void => {
  console.log('!');
};
```

### never

함수가 반드시 아무것도 return 하지 않을 때 사용

```ts
const hello = (): never => {
  // return하지 않고 오류를 발생시키는 함수
  // return 'X'; // 오류 발생
  throw new Error('XXX');
};
const setName = (name: string | number) => {
  if (typeof name === 'string') {
    // 함수의 타입 string
    name;
  } else if (typeof name === 'number') {
    // 함수의 타입 number
    name;
  } else {
    // 함수의 타입 never(실행되면 안되는 조건문)
    name;
  }
};
```

# Functions
## Call Signatures

```ts
function add(a:number, b:number){
  return a+b
}

const add2 = (a:number, b:number)=>a+b;
```
Call Signatures : 함수의 매개 변수의 타입과 리턴 타입
ex) const add:(a:number, b:number)=>number

시그니처 생성
```ts
type Add = (a:number, b:number)=>number;

const add:Add = (a,b)=>a+b
```

## Overloading
서로 다른 여러가지의 콜 시그니처를 가질 때 사용
```ts
type Add = {
  (a:number, b:number) : number
  (a:number, b:string) : number
}
const add : Add = (a,b)=>{
  if(typeof b === 'string') return a
  return a+b
}
```

다형성(polymorphism)






** 타입과 인터페이스는 비슷하지만 타입이 조금 더 활용성이 높음
```ts
type Team = 'Red' | 'Blue' | 'Yellow'
type Health = 1 | 5 | 10
// 인터페이스로는 이러한 지정을 할 수 없음
```
인터페이스보다 타입을 사용하는 경우가 많음

```ts
type User = {
  name:string
}
type Player = User & {} // and
const abc : Player = {
  name:'abc'
}
```
인터페이스는 객체 지향 프로그래밍의 개념을 활용해 디자인
타입은 더 유연함

인터페이스를 상속할 때 private로 만들 수 없음


## 4.5 polymorphism
다형성 : 다른 모양의 코드를 가질 수 있게 해주는 것
제네릭 사용(placeholder 타입 사용할 수 있게 해줌)

```ts
interface SStorage<T> {
  [key: string]: T;
}
class LocalStorage<T> {
  private storage: SStorage<T> = {};
  set(key: string, value: T) {
    this.storage[key] = value;
  }
  remove(key: string) {
    delete this.storage[key];
  }
  get(key: string): T {
    return this.storage[key];
  }
  clear() {
    this.storage = {};
  }
}

const stringsStorage = new LocalStorage<string>();
stringsStorage.get('cat');
stringsStorage.set('hello', 'world');

const booleanStorage = new LocalStorage<boolean>();
booleanStorage.get('abc');
booleanStorage.set('hello', true);
```

