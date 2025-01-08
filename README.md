# Todo List Manager

A Node.js task management system with REST API endpoints for managing todo items.

## Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

## API Endpoints

- `POST /tasks` - Create task
- `GET /tasks` - List tasks
- `PATCH /tasks/:id/complete` - Mark task complete
- `DELETE /tasks/:id` - Delete task

## Example Usage

### Windows PowerShell
```powershell
# Create task
Invoke-RestMethod -Uri "http://localhost:3000/tasks" -Method Post -Body '{"description": "Test task", "dueDate": "2024-01-10"}' -ContentType "application/json"

# List tasks
Invoke-RestMethod -Uri "http://localhost:3000/tasks" -Method Get
```

### Ubuntu/Linux
```bash
# Create task
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"description": "Test task", "dueDate": "2024-01-10"}'

# List tasks
curl http://localhost:3000/tasks

# Mark complete
curl -X PATCH http://localhost:3000/tasks/1/complete

# Delete task
curl -X DELETE http://localhost:3000/tasks/1
```

## Testing

```bash
npm test
```

## Development Notes

GitHub Copilot was used for:
- Generating error handling patterns with appropriate HTTP status codes
- Creating comprehensive Jest test cases including edge cases
- Suggesting error message formats and adding JSDoc comments 

## Project Structure

```
src/
├── tasks.js      # Core task management logic
├── server.js     # Express server setup
tests/
    └── tasks.test.js
```

## Features

- Task management (create, complete, list, delete)
- Status filtering (completed/pending)
- Error handling
- Unit tests
- RESTful API
