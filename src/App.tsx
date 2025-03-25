import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  return (
    <Container>
      <Title>todos</Title>
      <TodoContainer>
        <TodoInput onAdd={addTodo} />
        <TodoList todos={filteredTodos} onToggle={toggleTodo} />
        <Footer>
          <span>{todos.filter(todo => !todo.completed).length} items left</span>
          <FilterButtons>
            <FilterButton
              active={filter === 'All'}
              onClick={() => setFilter('All')}
            >
              All
            </FilterButton>
            <FilterButton
              active={filter === 'Active'}
              onClick={() => setFilter('Active')}
            >
              Active
            </FilterButton>
            <FilterButton
              active={filter === 'Completed'}
              onClick={() => setFilter('Completed')}
            >
              Completed
            </FilterButton>
          </FilterButtons>
          <ClearButton onClick={clearCompleted}>Clear completed</ClearButton>
        </Footer>
      </TodoContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 100px;
  color: rgba(175, 47, 47, 0.15);
  margin: 20px 0;
`;

const TodoContainer = styled.div`
  width: 550px;
  background: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  font-size: 14px;
  color: #777;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  color: ${props => (props.active ? '#e6e6e6' : '#777')};
  cursor: pointer;
  &:hover {
    color: #e6e6e6;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
  &:hover {
    color: #e6e6e6;
  }
`;

export default App;