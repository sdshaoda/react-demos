const defaultState = {
  inputValue: '',
  todolist: []
};

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'change_input_value':
      newState.inputValue = action.value;
      break;
    case 'add_todo':
      newState.todolist.push(state.inputValue)
      newState.inputValue = ''
      break;
    case 'delete_todo':
      newState.todolist.splice(action.value, 1)
      break;
    default:
      break;
  }
  return newState;
}
