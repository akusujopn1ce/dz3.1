import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTodosRequest, addTodoRequest, deleteTodoRequest,
  toggleTodoRequest, editTodoRequest, clearTodosRequest
} from './todoSlice';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(addTodoRequest(inputValue.trim()));
      setInputValue('');
    }
  };

  const handleSaveEdit = (id) => {
    if (editValue.trim()) {
      dispatch(editTodoRequest(id, editValue.trim()));
    }
    setEditId(null);
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="title">Redux Saga TODO</h1>

        <form onSubmit={handleAdd} className="add-form">
          <input
            type="text"
            placeholder="Нове завдання..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !inputValue.trim()}>
            {loading ? '...' : 'Додати'}
          </button>
        </form>

        <ul className="todo-list">
          {items.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              
              {editId === todo.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    autoFocus
                  />
                  <button className="btn-success" onClick={() => handleSaveEdit(todo.id)}>Зберегти</button>
                  <button className="btn-secondary" onClick={() => setEditId(null)}>Скасувати</button>
                </div>
              ) : (
                <>
                  <div className="item-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch(toggleTodoRequest(todo.id))}
                    />
                    <span className="text">{todo.text}</span>
                  </div>
                  <div className="item-actions">
                    <button 
                      className="btn-edit"
                      onClick={() => {
                        setEditId(todo.id);
                        setEditValue(todo.text);
                      }}
                    >
                      Редагувати
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => dispatch(deleteTodoRequest(todo.id))}
                    >
                      Вилучити
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
          {items.length === 0 && !loading && <p className="empty-msg">Список порожній</p>}
        </ul>

        <div className="footer">
          <span className="status">{loading ? '⏳ Обробка...' : `Всього: ${items.length}`}</span>
          <button 
            className="btn-danger-outline" 
            onClick={() => dispatch(clearTodosRequest())}
            disabled={items.length === 0 || loading}
          >
            Очистити все
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;