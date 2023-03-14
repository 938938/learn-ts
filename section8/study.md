# 데코레이터
일종의 함수, 코드 조각을 장식해주는 역할

@(at) 기호는 타입스크립트에게 이것이 데코레이터임을 알려주고, 타입스크립트는 클래스 실행 시 플러그인 형태로 실행되게 해준다.


메타 프로그래밍에 유용하게 사용 가능
보통 클래스에 적용
관습적으로 대문자로 시작하는 함수

데코레이터는 클래스 선언, 메서드, 접근자, 프로퍼티 또는 매개 변수에 첨부할 수 있는 특수한 종류의 선언입니다. 데코레이터는 @expression 형식을 사용합니다. 여기서 expression은 데코레이팅 된 선언에 대한 정보와 함께 런타임에 호출되는 함수여야 합니다.

데코레이터는 인수를 받음(target)

@ : 코딩에서 읽히거나 찾게 되는 특별한 식별자 상징
실행되지 않아도 지칭되어 데코레이터가 됨

```ts
function Logger(constructor: Function) {
  console.log('Logging...');
  cosnole.log(constructor);
}
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
}
Creating person object...
Person {name:'abc'}
```

데코레이터는 실체화 되기 전 클래스가 정의만 되어도 실행 됨
(클래스를 실체화할 필요가 없음)

## 데코레이터 팩토리
데코레이터 함수를 도출하는데 어떤 대상에 데코레이터를 할당할 때 설정할 수 있도록 해줌

데코레이터가 선언에 적용되는 방식을 원하는 대로 바꾸고 싶다면 데코레이터 팩토리를 작성할 수 있습니다. 데코레이터 팩토리는 단순히 데코레이터가 런타임에 호출할 표현식을 반환하는 함수입니다.

```ts
function color(value: string) { // 데코레이터 팩토리
    return function (target) { // 데코레이터
        // 'target'과 'value' 변수를 가지고 무언가를 수행합니다.
    }
}
```


## 속성 데코레이터

## 접근자 & 매개변수 데코레이터

## 클래스 데코레이터에서 클래스 반환

## 기타 데코레이터 반환 타입

## 타당성 검증

