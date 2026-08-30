import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 1. Импортируем Provider из библиотеки React-Redux
import { Provider } from 'react-redux';
// 2. Импортируем наше хранилище, которое мы создали
import { store } from './store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Оборачиваем App в Provider и передаем ему наш store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);