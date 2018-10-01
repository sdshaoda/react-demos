import React, { Component } from 'react';
import { Input, List, Button, Icon } from 'antd';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      todolist: [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
      ]
    }
  }

  addTodo = () => {
    console.log('add todo')
  }

  deleteTodo = (item) => {
    console.log(item)
  }

  render() {
    return (
      <div className="todo-list">
        <Input className="input" placeholder="add todo" />
        <Button type="primary" onClick={this.addTodo}>添加</Button>
        <List
          className="list"
          bordered
          dataSource={this.state.todolist}
          renderItem={item => (
            <List.Item extra={<Icon type="close" theme="outlined" onClick={this.deleteTodo.bind(this, item)} />}>
              {item}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default TodoList;
