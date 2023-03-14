# 제네릭 타입
## 내장 제네릭 & 제네릭이란?

제네릭 타입을 사용해서 타입스크립트에게 정보를 줄 수 있음
제네릭 타입은 하나의 타입 인수가 필요함
제네릭 타입을 사용하면 보다 나은 타입 안전성을 확보할 수 있음
타입 안전성과 결합된 유연성을 제공
전달하는 값이나 클래스에서 사용하는 값을 유연하게 저장 가능

다른 여러가지 가능한 타입과 함께 작동하는 타입을 사용하는 경우
(다른 타입의 데이터를 내보내는 객체 등)

제네릭 : 타입을 함수의 파라미터처럼 사용하는 것

제네릭 타입
타입의 첫글자인 T를 사용하는 것이 일반적(다른 문자를 사용해도 괜찮음)
관례상 한글자 사용

```ts
function merge(objA:object, objB:object)[
  return Object.assing(objA, objB)
]
const mergedObj = merge({name:'ABC'}, {age:30});
mergedObj.age; // 타입스크립트가 해당 값이 존재하는지 알지 못하기 때문에 접근 불가. 오류 발생



function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// 이 두 객체 타입의 인터셉션이라고 인식 가능
// 제네릭으론 이 두타입이 종종 다른 타입이 될 수 있음을 타입스크립트에게 전달
// 어떤 타입이 될지 모른다는 정보를 타입스크립트에게 제공
const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj);
```

## 제약조건 작업하기
그냥 제네릭 타입만 설정하면 어느 타입이라도 될 수 있기 때문에, 특정 타입을 설정하고자 할 땐 제약 조건 작업
```ts
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// T와 U가 어느 구조를 가지든 상관없지만 일단은 객체여야 함
```

## 다른 일반 함수

```ts
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}
```

## keyof 제약조건

```ts
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Max' }, 'name');
```
타입 스크립트에게 해당 정보가 있는지 알려주기 위해 사용
keyof 키워드를 지니는 제네릭 타입을 사용, 정확한 구조를 갖고자 함을 타입스크립트에 전달 가능

## 제네릭 클래스

```ts
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
```
원시값이 아닌 요소로는 indexof 가 작동을 하지 않음
원시값과만 작업하도록 제네릭 타입 설정
타입 안전성 보장

## 제네릭 유틸리티 타입
제네릭 타입을 사용하는 내장 타입, 특정 유틸리티 기능을 제공하는 제네릭 타입
```ts
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}
```
Partial 타입 : 타입이나 인터페이스의 모든 속성을 선택적인 객체 타입으로 변경
타입 전체의 모든 속성이 선택적인 타입으로 변경

```ts
const names: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Manu');
// names.pop();
```
Readonly 타입 : 타입이나 인터페이스의 모든 속성에 readonly 속성 부여

유틸리티 타입은 타입스크립트에만 존재, 다른 언어로 컴파일할 수 없음

## 제네릭 타입 vs 유니언 타입
