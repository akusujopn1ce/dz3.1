import { createSlice, createAction } from '@reduxjs/toolkit';

// --- Дії-тригери для Redux Saga ---
// Ці екшени не змінюють стан напряму, вони лише "будять" Сагу
export const fetchTodosRequest = createAction('todos/fetchRequest');
export const addTodoRequest = createAction('todos/addRequest', (text) => ({ payload: text }));
export const deleteTodoRequest = createAction('todos/deleteRequest', (id) => ({ payload: id }));
export const toggleTodoRequest = createAction('todos/toggleRequest', (id) => ({ payload: id }));
export const editTodoRequest = createAction('todos/editRequest', (id, text) => ({ payload: { id, text } }));
export const clearTodosRequest = createAction('todos/clearRequest');

// --- Slice (Синхронний стан) ---
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTodos: (state, action) => {
      state.items = action.payload;
    },
    addTodoSuccess: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTodoSuccess: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    toggleTodoSuccess: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.completed = !item.completed;
    },
    editTodoSuccess: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) item.text = action.payload.text;
    },
    clearTodosSuccess: (state) => {
      state.items = [];
    }
  }
});

export const { 
  setLoading, setTodos, addTodoSuccess, 
  deleteTodoSuccess, toggleTodoSuccess, editTodoSuccess, clearTodosSuccess 
} = todoSlice.actions;

export default todoSlice.reducer;