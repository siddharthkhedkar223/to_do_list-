class Task {
    constructor(description, dueDate) {
        this.id = Task.nextId++;
        this.description = description;
        this.dueDate = new Date(dueDate).toISOString();
        this.completed = false;
    }
}
Task.nextId = 1;

class TodoManager {
    constructor() {
        this.tasks = [];
    }

    addTask(description, dueDate) {
        if (!description || !dueDate) {
            throw new Error('Description and due date are required');
        }
        const task = new Task(description, dueDate);
        this.tasks.push(task);
        return task;
    }

    markAsComplete(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            throw new Error(`Task with id ${id} not found`);
        }
        task.completed = true;
        return task;
    }

    listTasks(filter) {
        if (filter === 'completed') {
            return this.tasks.filter(t => t.completed);
        }
        if (filter === 'pending') {
            return this.tasks.filter(t => !t.completed);
        }
        return this.tasks;
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1) {
            throw new Error(`Task with id ${id} not found`);
        }
        this.tasks.splice(index, 1);
    }
}

module.exports = { Task, TodoManager };