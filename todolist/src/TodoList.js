import React, { Component } from 'react';
import { Input, List, Button, Icon } from 'antd';
import store from './store'

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = store.getState();

    store.subscribe(this.storeChange);
  }

  storeChange = () => {
    this.setState(store.getState());
  }

  inputChange = (e) => {
    const action = {
      type: 'change_input_value',
      value: e.target.value
    };
    store.dispatch(action);
  }

  keydown = (e) => {
    if (e.keyCode === 13) {
      this.addTodo()
    }
  }

  addTodo = () => {
    const action = {
      type: 'add_todo'
    };
    store.dispatch(action);
  }

  deleteTodo = (item, index) => {
    const action = {
      type: 'delete_todo',
      value: index
    };
    store.dispatch(action);
  }

  render() {
    return (
      <div className="todo-list">
        <Input className="input" placeholder="add todo" value={this.state.inputValue} onChange={this.inputChange} onKeyDown={this.keydown} />
        <Button type="primary" onClick={this.addTodo}>添加</Button>
        <List
          className="list"
          bordered
          dataSource={this.state.todolist}
          renderItem={(item, index) => (
            <List.Item extra={<Icon type="close" theme="outlined" onClick={this.deleteTodo.bind(this, item, index)} />}>
              {item}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default TodoList;
