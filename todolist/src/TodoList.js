import React from 'react';
import { connect } from 'react-redux';
import { Input, List, Button, Icon } from 'antd';
import * as creators from './store/actionCreators';

function TodoList(props) {
  const { inputValue, todolist, inputChange, keydown, addTodo, deleteTodo } = props;
  let input = null;

  return (
    <div className="todo-list">
      <Input className="input" ref={el => input = el} placeholder="add todo" value={inputValue} onChange={inputChange} onKeyDown={keydown} />
      <Button type="primary" onClick={() => { addTodo(input.props.value) }}>添加</Button>
      <List
        className="list"
        bordered
        dataSource={todolist}
        renderItem={(item, index) => (
          <List.Item extra={<Icon type="close" theme="outlined" onClick={() => { deleteTodo(item, index) }} />}>
            {item}
          </List.Item>
        )}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    todolist: state.todolist
  }
}

const mapDispatchToProps = (dispatch) => {
  const addTodo = (inputValue) => {
    if (!inputValue) {
      return
    }
    const action = creators['addTodoAction']();
    dispatch(action);
  }

  return {
    inputChange(e) {
      const action = creators['changeInputValueAction'](e.target.value);
      dispatch(action);
    },
    keydown(e) {
      if (e.keyCode === 13) {
        addTodo(e.target.value)
      }
    },
    addTodo,
    deleteTodo(item, index) {
      const action = creators['deleteTodoAction'](index);
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
