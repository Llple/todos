import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders the app and adds a todo', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const todoText = 'Test Todo';

    fireEvent.change(input, { target: { value: todoText } });
    fireEvent.submit(input);

    expect(screen.getByText(todoText)).toBeInTheDocument();
  });

  test('toggles a todo', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const todoText = 'Test Todo';

    fireEvent.change(input, { target: { value: todoText } });
    fireEvent.submit(input);

    // Находим элемент списка по data-testid
    const todoItem = screen.getByTestId('todo-item-1'); // ID будет 1, так как это первая задача
    const checkbox = within(todoItem).getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(screen.getByText(todoText)).toHaveStyle('text-decoration: line-through');
  });

  test('filters todos', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.submit(input);

    const todoItem = screen.getByTestId('todo-item-1');
    const checkbox = within(todoItem).getByRole('checkbox');
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByText('Active'));
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Completed'));
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('clears completed todos', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.submit(input);

    const todoItem = screen.getByTestId('todo-item-1');
    const checkbox = within(todoItem).getByRole('checkbox');
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByText('Clear completed'));
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
  });
});