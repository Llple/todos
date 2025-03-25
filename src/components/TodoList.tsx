import React from 'react';
import styled from 'styled-components';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  return (
    <List>
      {todos.map(todo => (
        <TodoItem key={todo.id}>
          <Checkbox
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <TodoText completed={todo.completed}>{todo.text}</TodoText>
        </TodoItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e6e6e6;
  font-size: 24px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const TodoText = styled.span<{ completed: boolean }>`
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
  color: ${props => (props.completed ? '#d9d9d9' : 'inherit')};
`;

export default TodoList;