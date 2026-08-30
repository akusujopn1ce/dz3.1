import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

// 1. Створюємо контекст для теми
const ThemeContext = createContext();

// --- СТОРІНКИ ДОДАТКУ ---

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  
  // Додаємо стан для краш-тесту
  const [shouldCrash, setShouldCrash] = useState(false);

  // Error Boundary ловить помилки тільки під час рендеру. 
  // Тому ми кидаємо помилку тут, якщо state змінився.
  if (shouldCrash) {
    throw new Error("Це штучна помилка для перевірки Error Boundary!");
  }

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  // ФУНКЦІЯ ВИДАЛЕННЯ
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const triggerError = () => {
    // Змінюємо стан, що викличе перерендер і, як наслідок, помилку
    setShouldCrash(true); 
  };

  return (
    <div className="page-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>TODO Список</h2>
      <form onSubmit={handleAddTask} className="todo-form">
        <input 
          type="text" 
          className="todo-input"
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Що потрібно зробити?" 
        />
        <button type="submit" className="btn btn-primary">Додати</button>
      </form>
      
      {/* Оновлений список з кнопками видалення */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginBottom: '10px', background: 'var(--bg-color)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
            <span>{task.text}</span>
            <button 
              onClick={() => handleDeleteTask(task.id)}
              style={{ background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p style={{ textAlign: 'center', color: 'gray' }}>Список порожній. Додайте нове завдання!</p>}

      <hr style={{ margin: '30px 0', opacity: 0.2 }} />
      <button onClick={triggerError} className="btn" style={{ background: '#ef4444', color: 'white', width: '100%' }}>
        💥 Зламати додаток (Тест помилки)
      </button>
    </div>
  );
};

const Contacts = () => (
  <div className="page-container">
    <h2>Контакти</h2>
    <p>Зв'яжіться зі мною будь-яким зручним способом:</p>
    <ul>
      <li><strong>Email:</strong> frontend.dev@example.com</li>
      <li><strong>Телефон:</strong> +38 (099) 123-45-67</li>
      <li><strong>Telegram:</strong> @react_developer</li>
    </ul>
  </div>
);

const About = () => (
  <div className="page-container">
    <h2>Про мене</h2>
    <p>Привіт! Я розробник, який активно вивчає React, створює SPA додатки та обожнює чистий код.</p>
    <p>Цей проєкт демонструє роботу з React Router, Context API для тем та Error Boundaries.</p>
  </div>
);

// --- ХЕДЕР ---
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <nav className="nav-links">
        <Link to="/">Головна</Link>
        <Link to="/contacts">Контакти</Link>
        <Link to="/about">Про мене</Link>
      </nav>
      <button onClick={toggleTheme} className="btn btn-theme">
        {theme === 'light' ? '🌙 Темна' : '☀️ Світла'} тема
      </button>
    </header>
  );
};

// --- ГОЛОВНИЙ КОМПОНЕНТ APP ---
export default function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <Header />
        
        {/* Обертаємо наші маршрути у запобіжник помилок */}
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </ErrorBoundary>

      </BrowserRouter>
    </ThemeContext.Provider>
  );
}