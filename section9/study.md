## DOM 요소 선택 및 OOP 랜더링

DOM 요소 선택

```ts
class ProjectInput {
  templateElement: HTMLTemplateElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
  }
  // 타입스크립트는 html 파일을 분석하지 않기 때문에, ID별로 엘리먼트를 얻을 경우 null로 산출
  // 해당 엘리먼트가 있다는 것을 확실하게 하기 위해서 ! 추가
  // 해당 엘리먼트가 HTMLTemplateElement를 반환할 것이라는 것을 알려주기위한 타입캐스팅 추가
}
```

document.importNode('복제를 원하는 노드', boolean : 자식 노드 포함 여부)
전역 문서 객체에 제공되는 메서드
현재 문서가 아닌 외부 문서의 노드를 복사하여 현재 문서에 넣을 수 있도록 해줌
두번째 인자가 true일 경우 : 자시 노드 포함, false일 경우 : 자식 노드 미포함

```ts
class ProjectInput {
  templateElement: HTMLTemplateElement;
  ...
  constructor() {
    ...
    const importedNode = document.importNode(
      this.templateElement.content,
      // content : 템플릿 내용 참조
      // (템플릿 코드 사이의 html 코드 참조)
      true
    );
  }
}
```

insertAdjacentElement(삽입 위치, 삽입하고 싶은 노드)
엘리먼트에서 특정 위치에 노드를 삽입할 때 사용하는 메서드
첫번째 인자
beforebegin : element 앞에
afterbegin : element 안에 가장 첫번째 child
beforeend : element 안에 가장 마지막 child
afterend : element 뒤에

```ts
class ProjectInput {
  ...
  constructor() {
    ...
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    ...
  }
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}
```

## DOM 요소와 상호 작용

```ts
class ProjectInput {
  ...
  constructor() {
    ...
     this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }
  private configure() {
    this.element.addEventListener('submit', this.submitHandler.bind(this));
    // this.submitHandler는 현재 이벤트 대상에 바인딩 되기 때문에
    // bind 호출(bind(함수를 실행할 때 참조할 대상))
    //
  }
...
}
```

## Autobind 데코레이터 생성 및 사용

앱 여러 곳에서 bind를 호출해야 하는 경우 사용,
this키워드에 자동으로 바인딩 할 수 있어 새롭게 bind를 호출할 필요가 없음

실제 사용하지 않는 인자를 처리할 경우

- tsconfig에서 엄격한 규칙 완화
  (noUnusedParameters : false << 사용하지 않는 변수를 사실상 허용하게 되는 설정)

- 특별한 이름, \_ 사용.
  해당 변수명을 사용하면 자바스크립트와 타입스크립트는 이 값이 사용되지 않음을 알 수 있음

```ts
function autobind(
  _: any,
  _2: string,
  descriptior: PropertyDescriptor
) {
  const originalMethod = descriptior.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable:true,
    get(){
      const boundFn = originalMethod.bind(this)
      return boundFn;
    }
  }
  return adjDescriptor;
}
...
  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }
  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
```

해당 데코레이터를 bind가 필요한 곳에 적용

## 사용자 입력 가져오기

부정 형식을 함수의 반환 타입으로 사용하면 안됨
(undefined, null 등 대신 void 사용)

튜플인지 여부 확인할 때
자바스크립트에선 튜플을 그냥 배열로 인식하기 때문에 Array.isArray() 사용

## 재사용 가능한 검증 기능 생성

```js
// validation
interface validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
function validate(validatableInput: validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  ...
  return isValid;
}
...
  private gatherUserInput(): [string, string, number] | void {
    ...
    const titleValidatable: validatable = {
      value: enteredTitle,
      required: true,
    };
    ...
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ){
      ...
    }
  }
```

## 싱글톤으로 애플리케이션 상태 관리하기

앱 상태 관리하는 클래스 구축,
프로젝트와 앱 관리 대상이 되는 상태를 관리하여 앱에 관련된 각기 다른 부분의 리스너를 설정
전체 앱에서 한 가지 유형의 객체를 갖는 것
프로젝트에 하나의 상태 관리 객체만 가짐

- 객체 지향 방식 : 각기 다른 클래스가 반응하여 함께 작동하는 방식

## 열거형으로 프로젝트 필터링하기

필터링은 프로젝트를 저장 및 생성하기 전에 적용

렌더링시 기존 요소가 중복되는 문제

- 이미 생성된 것과 생성할 것을 비교하여 불필요한 리렌더링을 막는 방법

```ts
  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    listEl.innerHTML = '';

    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = prjItem.title;
      listEl?.appendChild(listItem);
    }
  }
```

- 렌더링때마다 innerHTML을 비우고 재생성(간단한 프로젝트의 경우 채택 가능)

## 상속 & 제네릭 추가하기

추상클래스에서는 직접 인스턴트화가 이루어지지 않음
대신 언제나 상속을 위해 사용됨
(클래스 앞에 추상 키워드 추가, 인스턴트화를 막음)
추상메서드는 비공개 설정을 할 수 없음

## 클래스로 프로젝트 항목 렌더링

프로젝트 항목 클래스 인스턴트화 > 프로젝트 항목 클래스의 생성자에서 초기화 실행

## 게터 사용하기

보통 게터와 세터는 다른 필드 아래에 생성

## 드래그 앤 드롭 구현

HTML의 드래그 앤 드롭이 적용되는 항목에 `draggable="true"` 추가
드래그 앤 드롭에 의한 상태 업데이트 필요
HTML 요소는 다른 요소의 위에 위치할 수 없기 때문에 다른 요소 위에 위치할 수 있도록 만들기 위해서는 놓일 장소에 있는 요소의 기본 동작을 event.preventDefault()를 사용해서 막을 필요가 있음.

```ts
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }
  // 브라우저와 자바스크립트에 드래그가 유효한 타겟임을 선언
```

```ts
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }
  // 핸들러를 드롭해서 실제 일어나는 드롭에 대응
```

```ts
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }
  // 사용자에게 비주얼 피드백을 줄 때 사용

```