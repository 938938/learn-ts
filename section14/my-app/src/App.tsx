import React, { useState } from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import { Todo } from './todo.model';

const App = () => {
  // const todos = [
  //   { id: 1, text: 'first test' },
  //   { id: 2, text: 'second test' },
  // ];
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoAddHandler = (text: string) => {
    console.log(text);
    setTodos((prev) => [...prev, { id: todos.length, text: text }]);
  };
  const todoDelHandler = (id: number) => {
    setTodos((prev) => {
      return prev.filter((ele) => ele.id !== id);
    });
  };
  return (
    <div className='App'>
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList todos={todos} onDeleteTodo={todoDelHandler} />
    </div>
  );
};

export default App;
