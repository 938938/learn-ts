# DOM 요소 선택 및 OOP 랜더링

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
beforebegin	: element 앞에 
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

# DOM 요소와 상호 작용
