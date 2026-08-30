import { configureStore, createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: ['Redux', 'React', 'JS'] 
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    }
  }
});

export const { addTodo } = todoSlice.actions;

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer
  }
});