// server.js
const express = require('express');
const { TodoManager } = require('./tasks');

const app = express();
app.use(express.json());

const todoManager = new TodoManager();

app.post('/tasks', (req, res) => {
    try {
        const { description, dueDate } = req.body;
        const task = todoManager.addTask(description, dueDate);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.patch('/tasks/:id/complete', (req, res) => {
    try {
        const task = todoManager.markAsComplete(parseInt(req.params.id));
        res.json(task);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.get('/tasks', (req, res) => {
    const { filter } = req.query;
    const tasks = todoManager.listTasks(filter);
    res.json(tasks);
});

app.delete('/tasks/:id', (req, res) => {
    try {
        todoManager.deleteTask(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;