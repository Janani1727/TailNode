import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  // Function to load TODO data from local storage
  const loadTodosFromLocalStorage = () => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  };

  useEffect(() => {
    // Load TODO data from local storage when the component mounts
    loadTodosFromLocalStorage();
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever the todos state changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo = { text: inputText, completed: false };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const handleTodoClick = (index) => {
    const updatedTodos = [...todos];
    const clickedTodo = updatedTodos[index];
    clickedTodo.completed = !clickedTodo.completed;
    setTodos(updatedTodos.sort(compareTodos));
  };

  const handleReset = () => {
    setTodos([]);
  };

  // Custom comparison function for sorting
  const compareTodos = (a, b) => {
    if (a.completed !== b.completed) {
      // Sort completed todos by completion status
      return a.completed ? 1 : -1;
    }
    // Sort active todos by creation time (most recent on top)
    return b.createdAt - a.createdAt;
  };

  return (
    <div className="todo-app">
      <div className='head'>
      <h1>TODO App</h1>
      <button className='headbtn'  onClick={handleReset}>Reset</button>
      </div>
      <div className='Inputdiv'>
      <input
        type="text"
        placeholder="Add a new TODO"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleAddTodo();
        }}
      />
      <button className='inputbtn' onClick={handleAddTodo}>Add</button>
      </div>
      
      
      <TodoList todos={todos} onTodoClick={handleTodoClick} />
    </div>
  );
}

export default TodoApp;
