import React from 'react';
import { Input, List, Button, Icon } from 'antd';

function TodoListUI(props) {
  return (
    <div className="todo-list">
      <Input className="input" placeholder="add todo" value={props.inputValue} onChange={props.inputChange} onKeyDown={props.keydown} />
      <Button type="primary" onClick={props.addTodo}>添加</Button>
      <List
        className="list"
        bordered
        dataSource={props.todolist}
        renderItem={(item, index) => (
          <List.Item extra={<Icon type="close" theme="outlined" onClick={() => { props.deleteTodo(item, index) }} />}>
            {item}
          </List.Item>
        )}
      />
    </div >
  )
}

export default TodoListUI;
