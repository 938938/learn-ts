import React from 'react';

interface TodoListProps {
  todos: { id: number; text: string }[];
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo }) => {
  return (
    <ul>
      {todos.map((ele) => (
        <li key={ele.id}>
          <span>{ele.text}</span>
          <button onClick={onDeleteTodo.bind(null, ele.id)}>Del</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
