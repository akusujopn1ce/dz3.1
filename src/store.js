import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todoReducer from './todoSlice';
import { rootSaga } from './sagas';

// Створюємо мідлвар для Саги
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  // Підключаємо мідлвар
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Запускаємо головну Сагу
sagaMiddleware.run(rootSaga);