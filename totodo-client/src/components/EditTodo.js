import React, { Component } from 'react';
import apiService from '../services/api-service.js';
import doneIcon from '../icons/done-icon.png';

export class EditTodo extends Component {

    state = {
        title: this.props.title,
        body: this.props.body,
        id: this.props.id
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
      }

    handleSubmit = (event) => {
        event.preventDefault();
        const {title, body, id} = this.state;
        apiService.updateTodo({
            title,
            body,
            id
        })
        .then(response => {
            this.props.closeEditForm();
            this.props.refresh();
        })
        .catch(error => console.log(error))
    }

    render() {
        const {title, body} = this.state;
        return (
            <article className="editTodoFormBox">
                <form className="editTodoForm" onSubmit={this.handleSubmit}>
                    <label className="inputLabel" htmlFor="title">Title:</label>
                    <input required className="inputField" name="title" type="text" value={title} onChange={this.handleChange}></input>
                    <label className="inputLabel" htmlFor="body">Notes:</label>
                    <textarea rows="4" className="inputField" name="body" type="text" value={body} onChange={this.handleChange}></textarea>
                </form>
                    <div className="toDoCardButtonsContainer">
                        <img className="toDoCardButton" onClick={this.handleSubmit} value="Add" src={doneIcon} alt="Done adding to-do"/>
                    </div>
            </article>
        )
    }
}

export default EditTodo
