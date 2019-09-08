import React, { Component } from 'react';
import './App.css';
import apiService from './services/api-service.js';

import ToDoList from './components/ToDoList.js';
import AddTodo from './components/AddTodo.js'

class App extends Component {

  state = {
    todos: [],
  }

  componentDidMount = () => {
    this.getTodos();
  }

  getTodos = () => {
    apiService.getAllTodos()
    .then(response => {
      this.setState({
          todos: response.data.reverse()
      })
    })
}

  render() {
    return (
      <>
        <header className="siteHeader">
          totodo
        </header>
        <div className="App">
          <AddTodo refresh={this.getTodos}/>
          <ToDoList refresh={this.getTodos} todos={this.state.todos}/>
        </div>
      </>
    );
  }
}

export default App;
