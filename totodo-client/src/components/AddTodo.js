import React, { Component } from 'react'
import apiService from '../services/api-service.js';
import addTodoIcon from '../icons/add-todo-icon.png';
import doneIcon from '../icons/done-icon.png';
import backIcon from '../icons/back-icon.png'

export class AddTodo extends Component {
    state = {
        title: "",
        body: "",
        formVisible: false,
    }

    toggleAddTodoForm = () => {
        const {formVisible} = this.state;
        this.setState({
            title: "",
            body: "",
            formVisible: !formVisible,
        })
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
      }

    handleSubmit = (event) => {
        event.preventDefault();
        const {title, body} = this.state;
        this.toggleAddTodoForm()
        apiService.createTodo({
            title,
            body
        })
        .then(response => {
        })
        .catch(error => console.log(error))
        this.props.refresh();
    }

    form = () => {
        const {title, body} = this.state;
        return (
            <article className="addTodoFormBox">
                <form className="addTodoForm">
                    <label className="inputLabel" htmlFor="title">Title:</label>
                    <input required className="inputField" name="title" type="text" value={title} onChange={this.handleChange} maxLength="32"></input>
                    <label className="inputLabel" htmlFor="body">Notes:</label>
                    <textarea rows="4" className="inputField" name="body" type="text" value={body} onChange={this.handleChange}></textarea>
                </form>
                    <div className="toDoCardButtonsContainer">
                        <img className="addTodoFormButton" onClick={this.handleSubmit} value="Add" src={doneIcon} alt="Done adding to-do"/>
                        <img className="addTodoFormButton" onClick={this.toggleAddTodoForm} value="Add" src={backIcon} alt="Cancel adding to-do"/>
                    </div>
            </article>
        )
    }

    render() {
        const {formVisible} = this.state;
        return (
            <div className="addTodoContainer">
                {
                    formVisible
                    ? this.form()
                    : <img src={addTodoIcon} alt="Add a todo" className="addTodoButton" onClick={this.toggleAddTodoForm}/>
                }
            </div>
        )
    }
}

export default AddTodo
