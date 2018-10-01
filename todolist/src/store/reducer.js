import * as types from './actionTypes'

const defaultState = {
  inputValue: '',
  todolist: []
};

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case types['CHANGE_INPUT_VALUE']:
      newState.inputValue = action.value;
      break;
    case types['ADD_TODO']:
      newState.todolist.push(state.inputValue)
      newState.inputValue = ''
      break;
    case types['DELETE_TODO']:
      newState.todolist.splice(action.value, 1)
      break;
    default:
      break;
  }
  return newState;
}
