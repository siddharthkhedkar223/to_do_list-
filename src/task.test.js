// tasks.test.js
const { Task, TodoManager } = require('./tasks');

describe('TodoManager', () => {
    let todoManager;

    beforeEach(() => {
        todoManager = new TodoManager();
    });

    describe('addTask', () => {
        it('should add a new task with valid inputs', () => {
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
        it('should mark a task as complete', () => {
            const task = todoManager.addTask('Test task', '2024-01-10');
            const completedTask = todoManager.markAsComplete(task.id);
            expect(completedTask.completed).toBe(true);
        });

        it('should throw error for non-existent task', () => {
            expect(() => todoManager.markAsComplete(999)).toThrow();
        });
    });

    describe('listTasks', () => {
        beforeEach(() => {
            todoManager.addTask('Task 1', '2024-01-10');
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
            const task = todoManager.addTask('Test task', '2024-01-10');
            todoManager.deleteTask(task.id);
            expect(todoManager.listTasks()).toHaveLength(0);
        });

        it('should throw error when deleting non-existent task', () => {
            expect(() => todoManager.deleteTask(999)).toThrow();
        });
    });
});