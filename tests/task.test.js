// tasks.test.js
const { Task, TodoManager } = require('../src/tasks');

describe('TodoManager', () => {
    let todoManager;

    beforeEach(() => { 
        todoManager = new TodoManager();
    }); 

    describe('addTask', () => {
        it('should add a new task with valid inputs', () => {
            /**
             * Adds a new task to the todo manager.
             *
             * @param {string} taskName - The name of the task to be added.
             * @param {string} dueDate - The due date of the task in YYYY-MM-DD format.
             * @returns {Object} The newly added task object.
             */
            const task = todoManager.addTask('Test task', '2024-01-10');
            expect(task.description).toBe('Test task');
            expect(task.completed).toBe(false);
            expect(task.id).toBe(1);
        });

        it('should throw error when description is missing', () => {
            expect(() => todoManager.addTask(null, '2024-01-10')).toThrow();
        });
    });

    describe('markAsComplete', () => {
        /**
         * Marks a task as complete.
         *
         * @param {number} taskId - The ID of the task to be marked as complete.
         * @returns {Object} The updated task object with completed status.
         */
        it('should mark a task as complete', () => {
            const task = todoManager.addTask('Test task', '2024-01-10');
            const completedTask = todoManager.markAsComplete(task.id);
            expect(completedTask.completed).toBe(true);
        });

        /**
         * Throws an error when trying to mark a non-existent task as complete.
         */
        it('should throw error for non-existent task', () => {
            expect(() => todoManager.markAsComplete(999)).toThrow();
        });
    });

    describe('listTasks', () => {
        beforeEach(() => {
            todoManager.addTask('Task 1', '2024-01-10');
            /**
             * Represents the second task added to the todo manager.
             * @type {Object}
             * @property {string} title - The title of the task.
             * @property {string} dueDate - The due date of the task in YYYY-MM-DD format.
             */
            const task2 = todoManager.addTask('Task 2', '2024-01-11');
            todoManager.markAsComplete(task2.id);
        });

        it('should list all tasks when no filter', () => {
            expect(todoManager.listTasks()).toHaveLength(2);
        });

        it('should list only completed tasks', () => {
            const completed = todoManager.listTasks('completed');
            expect(completed).toHaveLength(1);
            expect(completed[0].completed).toBe(true);
        });

        it('should list only pending tasks', () => {
            const pending = todoManager.listTasks('pending');
            expect(pending).toHaveLength(1);
            expect(pending[0].completed).toBe(false);
        });
    });

    describe('deleteTask', () => {
        it('should delete an existing task', () => {
            /**
             * Adds a task to the todo manager.
             *
             * @param {string} description - The description of the task.
             * @param {string} dueDate - The due date of the task in YYYY-MM-DD format.
             * @returns {Object} The newly added task object.
             */
            const task = todoManager.addTask('Test task', '2024-01-10');
            todoManager.deleteTask(task.id);
            expect(todoManager.listTasks()).toHaveLength(0);
        });

        it('should throw error when deleting non-existent task', () => {
            expect(() => todoManager.deleteTask(999)).toThrow();
        });
    });
});