import React, { useState } from 'react';
import styled from 'styled-components';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What needs to be done?"
      />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e6e6e6;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  font-size: 24px;
  font-style: italic;
  color: #777;
  &:focus {
    outline: none;
  }
`;

export default TodoInput;