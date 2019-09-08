import axios from 'axios';

// `http://localhost:4000/api`
// `https://totodo-server.herokuapp.com/api`

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: `http://localhost:4000/api`, 
        })
    }

    getAllTodos = async () => {
        const todos = await this.api.get(`/todos/all`)
        .then(response => response)
        .catch(error => console.log(error))
        return todos
    }

    createTodo(todo) {
        return this.api.post('/todos/new', todo)
        .then(response => response)
        .catch(error => console.log(error))
    }
    
    updateTodo(todo) {
        const {title, body, id} = todo;
        return this.api.put(`/todos/${id}/update`, {title, body})
        .then(response => response)
        .catch(error => console.log(error))
    }

    removeTodo(id) {
        return this.api.delete(`/todos/${id}/delete`)
    }
}

const apiService = new ApiService();
export default apiService;