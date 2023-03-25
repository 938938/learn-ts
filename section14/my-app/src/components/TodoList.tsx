import React from 'react';

interface TodoListProps {
  todos: { id: number; text: string }[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <ul>
      {todos.map((ele) => (
        <li key={ele.id}>{ele.text}</li>
      ))}
    </ul>
  );
};

export default TodoList;
