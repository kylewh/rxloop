import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import pipeR from '../../../';
import todo from './models';

const app = pipeR();
app.model(todo);

class App extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    this.todo = app.todo$.subscribe((state) => {
      this.setState(state);
    });
    app.dispatch({
      type: 'todo/getList',
    });
  }

  componentWillUnmount() {
    this.todo.unsubscribe();
  }

  addTodo = () => {
    const id = Math.random();
    // 添加
    app.dispatch({
      type: 'todo/add',
      item: { id, todo: `list ${id}` },
    });
  };

  delTodo = (id) => {
    // 删除
    app.dispatch({
      type: 'todo/del',
      id,
    });
  };

  render() {
    const Todos = this.state.list.map((v) => {
      return (
        <li key={v.id}>
          {v.todo}
          <button onClick={() => {
            this.delTodo(v.id);
          }}>-</button>
        </li>
      );
    });

    return (
      <div>
        <ul>
          {Todos}
        </ul>
        <button onClick={this.addTodo}>+</button>
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app'),
);