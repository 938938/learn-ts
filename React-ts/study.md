# React typescript 시작
```$ npx create-react-app my-app --template typescript ```

* react-app-env.d.ts : React와 타입스크립트를 연결하는 파일
* package.json
'@types'패키지 : 바닐라 자바스크립트 라이브러리와 타입스크립트 프로젝트 사이의 번역기 역할

# Props
Parameter 'props' implicitly has an 'any' type
= 'props' 매개변수가 현재 any 타입이라는 경고 메세지
(타입을 지정하지 않았을 때 발생, 만약 any 타입을 명시적으로 지정하면 해당 경고 메세지는 발생하지 않음)

React.FC 는 제네릭 타입
이미 내부에서 홀화살괄호를 사용해 정의된 상태
따라서 Todos:React.FC<{...}> 는 새로운 제네릭 타입을 만드는 것이 아니라, 내부적으로 사용되는 제네릭 타입에 구체적인 값을 추가하는 것
...에 필요한 형태의 props 정의
FC는 'key'같은 특별한 프로퍼티를 컴포넌트에 추가해 사용할 수 있게 해줌

* React.FC 타입에는 children이 암묵적으로 포함 되어 있었으나 18v 에서 삭제됨

# 타입 정의
프로젝트에서 사용할 다양한 타입을 모아둘 models 폴더 생성
todo.ts 파일 생성
```ts
class Todo {
  id: string;
  text: string;
  constructor(todoText: string) {
    this.text = todoText;
    this.id = new Date().toLocaleDateString();
  }
}
```
class 는 생성자 역할 뿐 아니라 타입으로도 사용할 수 있음
```tsx
//App.tsx
  const todos = [new Todo('할 일'), new Todo('할 일2')];
//Todos.tsx
const Todos: React.FC<{ items: Todo[] }> = (props) => {
  ...
};
```

# Form 이벤트
```tsx
const NewTodo = () => {
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={submitHandler}>
    ... 
    </form>
  );
};
```
onSubmit에 전달되는 evnet는 FormEvent임을 명시해야 함

# useRef
useRef은 제네릭 타입으로 정의되어 있음
따라서 해당 useRef으로 생성할 레퍼런스가 어떤 타입일지 명확히 설정해야 함
```tsx
const NewTodo = () => {
  const todoTextInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = todoTextInputRef.current!.value;
  };
  return (
    ...
      <input type='text' id='text' ref={todoTextInputRef} />
    ...
  );
};
```
useRef 레퍼런스가 다른 값에 할당되어있을 수도 있기 때문에 초기값으로 null을 지정해줘야 함
(지정하지 않으면 input에 ref를 연결할 때 오류 발생)

```todoText.inputRef.current.value;```에서 타입스크립트는 해당 코드가 실행될 때 current값이 있음을 확인하지 못하므로, 해당 값이 있음을 확신시켜주기 위해 ! 추가
( ! : 해당 값이 절대로 null 이 아님을 확신할 때 사용
  ? : 해당 값이 있는지 없는지 확신할 수 없을 때 사용.
      일단 값에 접근해보고 접근이 가능하다면 입력된 값 사용, 접근이 불가능하다면 null 값 저장 )

# function props
props으로 function을 받을 때
```tsx
const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {
  const submitHandler = (event: React.FormEvent) => {
    ...
    props.onAddTodo(enteredText);
  };
};
```
다른 타입의 props를 받을 때와 마찬가지로 타입 지정 필요
onAddTodo 함수는 반환 값이 없기 때문에 void 지정

```tsx
const TodoItem: React.FC<{
  text: string;
  onRemoveTodo: (event: React.MouseEvent) => void;
}> = (props) => {
  return (
    <li className={classes.item} onClick={props.onRemoveTodo}>
      {props.text}
    </li>
  );
};
```
이 경우 인수를 사용하지 않기 때문에, 인수의 타입을 정의하는건 선택사항이 됨

```tsx
const Todos: React.FC<{ items: Todo[]; onRemoveTodo: (id: string) => void }> = (
  props
) => {
  return (
    ...
        <TodoItem
          ...
          onRemoveTodo={props.onRemoveTodo.bind(null, item.id)}
          ...
};
```
bind를 사용해서 실행할 함수를 미리 설정 가능
onRemoveTodo가 매개변수로 받을 값을 두번째로 전달

# Context API
```tsx
import React, { useState } from 'react';
import Todo from '../models/todo';

type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

// 18v 부터 React.FC가 children을 암묵적으로 허용하던 부분이 사라졌기 때문에, ReactNode로 새롭게 children 타입을 정해줘야 함
const TodosContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  // App.tsx에서 사용하던 상태관리 코드 가져오기
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodoHandler = (text: string) => {
    const newTodo = new Todo(text);
    setTodos((prev) => [...prev, newTodo]);
  };
  const removeTodoHandler = (todoId: string) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== todoId);
    });
  };

  // Provider로 전달할 value값 지정
  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;

```

```tsx
//App.tsx
function App() {
  return (
    // useContext를 사용하기 위해서는 해당 컨텍스트를 사용하는 컴포넌트들을 Provider로 감싸야 함
    <TodosContextProvider>
      <NewTodo />
      <Todos />
    </TodosContextProvider>
  );
}

// Todos.tsx
const Todos: React.FC = () => {
  // props 대신 Context로 상태값을 가지고 와서 사용할 수 있음(코드를 더 깔끔하게 사용 가능)
  const todosCtx = useContext(TodosContext);
  return (
    <ul className={classes.todos}>
      {todosCtx.items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;

```
