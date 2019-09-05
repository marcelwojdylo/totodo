const express = require('express');
let Todo = require('../models/Todo');

const router = express.Router();

router.get('/todos/all', async (req, res, next) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        next(error)
    }
});

router.post('/todos/new', async (req, res, next) => {
    if (!req.body.title) {
        return res.status(400).send({
            message: "The title field is required",
        })
    }
    try {
        await Todo.create(req.body);
        res.status(200).json({message: "Todo created successfully."})
    } catch (err) {
        next(err);
    }
})

router.put('/todos/:id/update', async (req, res, next) => {
    const {id} = req.params;
    if (!req.body.title) {
        return res.status(400).send({
            message: "The title field is required",
        })
    }
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
})

router.delete('/todos/:id/delete', async (req, res, next) => {
    const {id} = req.params;
    try {
        await Todo.findByIdAndRemove(id);
        return res.status(200).json({message: "Todo deleted"})
    } catch (error) {
        next(error)
    }
})

module.exports = router;