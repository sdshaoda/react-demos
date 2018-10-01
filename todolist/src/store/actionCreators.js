import * as types from './actionTypes'

export const changeInputValueAction = (value) => ({
  type: types['CHANGE_INPUT_VALUE'],
  value: value
})

export const addTodoAction = () => ({
  type: types['ADD_TODO']
})

export const deleteTodoAction = (index) => ({
  type: types['DELETE_TODO'],
  value: index
})
