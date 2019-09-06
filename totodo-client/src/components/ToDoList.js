import React, { Component } from 'react';
import apiService from '../services/api-service.js';
import EditTodo from './EditTodo.js';
import editTodoIcon from '../icons/edit-todo-icon.png';
import removeTodoIcon from '../icons/remove-todo-icon.png';

export class ToDoList extends Component {
    state = {
        todos: [],
        editingTodo: ""
    }

    getTodos = () => {
        apiService.getAllTodos()
        .then(response => {
            this.setState({
                todos: response.data.reverse()
            })
          })
    }

    handleDelete = (id) => {
        apiService.removeTodo(id)
        this.props.refresh()
    }

    handleEdit = (id) => {
        this.setState({
            editingTodo: id
        })
    }

    finishEditing = () => {
        this.setState({
            editingTodo: ""
        })
    }

    componentDidMount = () => {
        this.getTodos();
    }

    componentDidUpdate = () => {
        // this.getTodos();
    }


    render() {
        const {todos, editingTodo} = this.state;
        return (
            <>
                <div className="toDoList">
                    {
                       todos.length > 0 
                       ? todos.map(todo => {
                            if (todo) {
                                const {body, title, _id} = todo;
                                const withHtmlNewlines = 
                                    body
                                    .split('\n')
                                    .map((item,key)=>{
                                        return (
                                            <span key={key}>
                                                {item}
                                                <br/>
                                            </span>
                                        )
                                    })
                                if (editingTodo === todo._id) {
                                    return (
                                        <EditTodo title={title} body={body} id={_id} closeEditForm={this.finishEditing} refresh={this.props.refresh} key={_id}/>
                                    )
                                } else {}
                                    return (
                                    <section key={_id} className="toDoCard">
                                        <article className="toDoCardContent">
                                            <span className="toDoCardTitle">{title}</span>
                                            <span className="toDoCardBody">{withHtmlNewlines}</span>
                                        </article>
                                        <span className="toDoCardButtonsContainer">
                                            <img src={editTodoIcon} className="toDoCardButton" onClick={() => this.handleEdit(todo._id)} alt="Edit this todo"/>
                                            <img src={removeTodoIcon} className="toDoCardButton" onClick={() => this.handleDelete(todo._id)} alt="Remove this todo"/>
                                        </span>
                                    </section>
                                )
                            } else {
                               return ""
                            }
                       }) : <p>Loading...</p>
                    }
                </div>
            </>
        )
    }
}

export default ToDoList

