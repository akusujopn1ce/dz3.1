import { call, put, takeEvery, select, delay } from 'redux-saga/effects';
import {
  fetchTodosRequest, addTodoRequest, deleteTodoRequest,
  toggleTodoRequest, editTodoRequest, clearTodosRequest,
  setLoading, setTodos, addTodoSuccess, deleteTodoSuccess,
  toggleTodoSuccess, editTodoSuccess, clearTodosSuccess
} from './todoSlice';

const saveToStorage = (todos) => localStorage.setItem('saga_todos', JSON.stringify(todos));
const loadFromStorage = () => JSON.parse(localStorage.getItem('saga_todos') || '[]');


function* workFetchTodos() {
  yield put(setLoading(true));
  yield delay(600); 
  const todos = yield call(loadFromStorage);
  yield put(setTodos(todos));
  yield put(setLoading(false));
}

function* workAddTodo(action) {
  yield put(setLoading(true));
  yield delay(400); 
  const newTodo = { id: Date.now(), text: action.payload, completed: false };
  yield put(addTodoSuccess(newTodo));
  
  const todos = yield select((state) => state.todos.items);
  yield call(saveToStorage, todos);
  yield put(setLoading(false));
}

function* workDeleteTodo(action) {
  yield put(deleteTodoSuccess(action.payload));
  const todos = yield select((state) => state.todos.items);
  yield call(saveToStorage, todos);
}

function* workToggleTodo(action) {
  yield put(toggleTodoSuccess(action.payload));
  const todos = yield select((state) => state.todos.items);
  yield call(saveToStorage, todos);
}

function* workEditTodo(action) {
  yield put(editTodoSuccess(action.payload));
  const todos = yield select((state) => state.todos.items);
  yield call(saveToStorage, todos);
}

function* workClearTodos() {
  yield put(setLoading(true));
  yield delay(400);
  yield put(clearTodosSuccess());
  yield call(saveToStorage, []);
  yield put(setLoading(false));
}

export function* rootSaga() {
  yield takeEvery(fetchTodosRequest.type, workFetchTodos);
  yield takeEvery(addTodoRequest.type, workAddTodo);
  yield takeEvery(deleteTodoRequest.type, workDeleteTodo);
  yield takeEvery(toggleTodoRequest.type, workToggleTodo);
  yield takeEvery(editTodoRequest.type, workEditTodo);
  yield takeEvery(clearTodosRequest.type, workClearTodos);
}