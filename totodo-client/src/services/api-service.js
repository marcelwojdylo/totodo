import axios from 'axios';
require('dotenv').config();

// `http://localhost:4000/api`
// `https://totodo-server.herokuapp.com/api`

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: `https://totodo-server.herokuapp.com/api`, 
            // withCredentials: true,
        })
    }

    getAllTodos = async () => {
        const todos = await this.api.get(`/todos/all`)
        .then(response => response)
        return todos
    }

    createTodo(todo) {
        return this.api.post('/todos/new', todo)
        .then(response => response)
    }
    
    updateTodo(todo) {
        const {title, body, id} = todo;
        return this.api.put(`/todos/${id}/update`, {title, body})
        .then(response => response)
    }

    removeTodo(id) {
        return this.api.delete(`/todos/${id}/delete`)
    }
}

const apiService = new ApiService();
export default apiService;