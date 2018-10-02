import React, { Component } from 'react';
import store from './store';
import * as creators from './store/actionCreators';
import TodoListUI from './TodoListUI';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = store.getState();
    // this.input = React.createRef();

    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentDidMount() {
    const action = creators['initTodoAction']();
    store.dispatch(action);
  }

  inputChange = (e) => {
    const action = creators['changeInputValueAction'](e.target.value);
    store.dispatch(action);
  }

  keydown = (e) => {
    if (e.keyCode === 13) {
      this.addTodo()
    }
  }

  addTodo = () => {
    // if (!this.input.current.props.value) {
    //   return
    // }
    const action = creators['addTodoAction']();
    store.dispatch(action);
  }

  deleteTodo = (item, index) => {
    const action = creators['deleteTodoAction'](index);
    store.dispatch(action);
  }

  render() {
    return (
      <TodoListUI
        inputValue={this.state.inputValue}
        inputChange={this.inputChange}
        keydown={this.keydown}
        addTodo={this.addTodo}
        todolist={this.state.todolist}
        deleteTodo={this.deleteTodo}
      />
    );
  }
}

export default TodoList;
