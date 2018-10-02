import axios from 'axios';
import * as types from './actionTypes'

export const changeInputValueAction = (value) => ({
  type: types['CHANGE_INPUT_VALUE'],
  value: value
})

export const initTodoAction = () => ({
  type: types['INIT_TODO']
})

export const addTodoAction = () => ({
  type: types['ADD_TODO']
})

export const deleteTodoAction = (index) => ({
  type: types['DELETE_TODO'],
  value: index
})

export const getInitTodoAction = () => {
  return (dispatch) => {
    axios.get('/api/todolist').then((res) => {
      console.log(res.data)
    }).catch((err) => {
      const action = initTodoAction();
      dispatch(action);
    })
  }
}