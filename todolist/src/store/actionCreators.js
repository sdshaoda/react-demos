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

export const getInitTodo = () => ({
  type: types['GET_INIT_TODO']
})
