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
