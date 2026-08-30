import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from './store';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue.trim()));
      setInputValue(''); 
    }
  };

  return (
    <div className="app-container">
      <div className="todo-wrapper">
        <h1 className="title">TODO</h1>
        
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="todo-input"
          />
          <button type="submit" className="todo-btn">Добавить</button>
        </form>

        <h2 className="subtitle">TODOS</h2>
        
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {todo}
            </li>
          ))}
        </ul>

        <div className="todo-footer">
          Всього: {todos.length}
        </div>
      </div>
    </div>
  );
}

export default App;