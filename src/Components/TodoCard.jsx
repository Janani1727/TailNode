import React from 'react';

function TodoCard({ todo, onClick }) {
  const cardClassName = `todo-card ${todo.completed ? 'completed' : ''}`;

  return (
    <div className={cardClassName} onClick={onClick}>
      {todo.text}
      {todo.completed && <span className="completed-text">Completed</span>}
    </div>
  );
}

export default TodoCard;
