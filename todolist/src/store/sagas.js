
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as creators from './actionCreators';

function* getInitTodo() {
  try {
    const res = yield axios.get('/api/todolist');
    const action = creators['initTodoAction'](res);
    yield put(action);
  } catch (e) {
    const action = creators['initTodoAction']();
    yield put(action);
  }
}

function* mySaga() {
  yield takeEvery('GET_INIT_TODO', getInitTodo);
}

export default mySaga;