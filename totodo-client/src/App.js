import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import 'milligram';

import ToDoList from './components/ToDoList.js';
import AddTodo from './components/AddTodo.js'

class App extends Component {

  refresh = () => {
    this.forceUpdate()
  }

  render() {
    return (
      <>
        <header className="siteHeader">
          totodo
        </header>
        <div className="App">
          <AddTodo refresh={this.refresh}/>
          <ToDoList refresh={this.refresh}/>
        </div>
      </>
    );
  }
}

export default App;
