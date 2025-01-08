class Task {
    constructor(description, dueDate) {
        this.id = Task.nextId++;
        this.description = description;
        this.dueDate = new Date(dueDate).toISOString();
        this.completed = false;
    }
}
Task.nextId = 1;

/**
 * Manages a list of tasks.
 */
class TodoManager {
    /**
     * Creates an instance of TodoManager.
     */
    constructor() {
        this.tasks = [];
    }

    /**
     * Adds a new task to the list.
     * @param {string} description - The description of the task.
     * @param {Date} dueDate - The due date of the task.
     * @returns {Task} The created task.
     * @throws {Error} If description or due date is not provided.
     */
    addTask(description, dueDate) {
        if (!description || !dueDate) {
            throw new Error('Description and due date are required');
        }
        const task = new Task(description, dueDate);
        this.tasks.push(task);
        return task;
    }

    /**
     * Marks a task as complete.
     * @param {number} id - The ID of the task to mark as complete.
     * @returns {Task} The updated task.
     * @throws {Error} If the task with the given ID is not found.
     */
    markAsComplete(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            throw new Error(`Task with id ${id} not found`);
        }
        task.completed = true;
        return task;
    }

    /**
     * Lists tasks based on a filter.
     * @param {string} [filter] - The filter to apply ('completed' or 'pending').
     * @returns {Task[]} The list of tasks that match the filter.
     */
    listTasks(filter) {
        if (filter === 'completed') {
            return this.tasks.filter(t => t.completed);
        }
        if (filter === 'pending') {
            return this.tasks.filter(t => !t.completed);
        }
        return this.tasks;
    }

    /**
     * Deletes a task from the list.
     * @param {number} id - The ID of the task to delete.
     * @throws {Error} If the task with the given ID is not found.
     */
    deleteTask(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1) {
            throw new Error(`Task with id ${id} not found`);
        }
        this.tasks.splice(index, 1);
    }
}

module.exports = { Task, TodoManager };