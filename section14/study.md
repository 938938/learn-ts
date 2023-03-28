# React + TypeScript

CRA를 사용해서 타입스크립트 프로젝트를 생성할 때

```
npx create-react-app [프로젝트명] --template=typescript
```

이미 생성된 프로젝트에 타입스크립트를 추가할 때

```
npm install typescript @types/node @types/react @types/react-dom @types/jest
```

.tsx : jsx 코드를 사용할 수 있는 확장자

## React와 Type

```tsx
const App: React.FC = () => {
  return <div className='App'></div>;
};
```

React. : 리액트에서 제공하는 타입
(node_modules의 @types 폴더에서 찾을 수 있음)
FC : Function Component(jsx를 리턴)

### React.FC 는 사용하지 않는 추세가 되고 있음
#### 제네릭을 지원하지 않음
#### 컴파운드 컴포넌트 패턴의 타이핑을 혼란스럽게 함
#### defaultProps를 사용할 수 없게 됨
#### ~~Children을 암시적으로 보유~~

~~React.FC 는 해당 컴포넌트가 props로 children를 가지고 있음을 암시적으로 전달~~
~~children을 다루고 있지 않은 컴포넌트에 children을 넘겨주어도 타입 에러가 발생하지 않는다~~
```tsx
const NoChildren: React.FC = () => {
  return <div>Hello, world!</div>;
};
const App = () => {
  <NoChildren>Helllllllo!!!</NoChildren>;
};
```
**해당 암묵적 선언은 18버전에서 제거됨**


**React.FC를 사용하지 않을 경우 타입스크립트는 해당 타입을 JSX.Element 로 추정**


## Prop의 타입

타입스크립트를 리액트와 같이 사용할 때에는 이용하는 타입을 명확하게 지정해야 함
컴포넌트에 프롭을 사용한다면 타입스크립트로 이 프롭이 어떻게 생겼는지, 어떤 구조를 가지고 있는지 명시

```tsx
interface TodoListProps {
  todos: { id: number; text: string }[];
}
// 프롭으로 받을 타입을 <> 안에 명시
const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    ...
  );
};
```

## ref 으로 사용자 입력 받기
input 안의 내용을 불러오는 방법
* useState : 양방향 바인딩으로 관리
* useRef : 제출될 때 유저가 입력한 내용 추출

### useRef
useRef을 사용할 때는 타입을 설정해야 함
# (typescript와 useRef에 대해서 더 알아보기)
```tsx
const NewTodo: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  ...
  return (
    <form onSubmit={todoSubmitHandler}>
        ...
        <input type='text' id='todo-text' ref={inputRef} />
        ...
    </form>
  );
};
```
useRef이 연결된 부분이 input이기 때문에 HTMLInputElement 타입 전달
기본값으로 null 지정
inputRef.current.value 를 사용할 때, 타입스크립트는 해당 시점에 값이 있음을 확신할 수 없으므로 ! 를 전달해 해당 값이 있음을 알려줘야 한다

## 상태 및 타입 작업
어플리케이션의 여러 위치에서 / 자주 사용하는 아이템인 경우 ().model.ts 처럼 새로운 파일을 만들어 모음
```ts
//todo.module.ts
export interface Todo {
  id: number;
  text: string;
}
```

```tsx
//App.tsx
  const [todos, setTodos] = useState<Todo[]>([]);
```
useState를 단순히 빈배열로 초기화만 할 경우, 타입스크립트는 해당 상태가 항상 빈 배열일 것이라고만 추측
해당 상태가 어떻게 구성될 것인지를 따로 알려줘야 할 필요가 있음

>useState는 상태가 비동기적으로 업데이트 되기 때문에 변경사항이 즉시 반영되지 않음
따라서 ```setTodos([...todos, { id: todos.length, text: text }]);``` 코드의 경우 해당 todos가 가장 최신 상태가 아닐 수 있기 때문에, 상태를 업데이트 할 때 최신 상태를 사용할 것을 보장하기 위해 함수 사용
```setTodos((prev) => [...prev, { id: todos.length, text: text }]);```

## 더 많은 props 및 상태 작업
삭제 기능을 추가하기 위해 id를 인자로 받는 함수를 TodoList로 전달, button의 onClick 이벤트에 해당 함수를 연결한다
```tsx
interface TodoListProps {
  todos: { id: number; text: string }[];
  onDeleteTodo: (id: number) => void;
  // 프롭으로 받는 아이템에 함수 추가
}
const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo }) => {
  return (
    <ul>
      {todos.map((ele) => (
        ...
          <button onClick={onDeleteTodo.bind(null, ele.id)}>Del</button>
          // 해당 id값을 전달하기 위해 bind 사용, this 키워드는 현재 필요 없기 때문에 null로 두고 두 번째 매개변수가 해당 함수가 받을 첫번째 매개변수가 됨
        ...
      ))}
    </ul>
  );
};
```

#### react-route-dom 사용
npm i @types/react-router-dom 설치 필요
