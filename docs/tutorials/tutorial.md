# Task Manager API Tutorial

Welcome to the Task Manager API tutorial! This guide will walk you through setting up and using the Task Manager API, both through the REST API and the CLI interface.

## Table of Contents

1. [Installation and Setup](#installation-and-setup)
2. [Your First Task](#your-first-task)
3. [Using the REST API](#using-the-rest-api)
4. [Using the CLI](#using-the-cli)
5. [Advanced Usage](#advanced-usage)
6. [Troubleshooting](#troubleshooting)

## Installation and Setup

### Step 1: Clone and Install

First, clone the repository and install dependencies:

```bash
git clone <your-repository-url>
cd task-manager-api
npm install
```

### Step 2: Configure Environment

Copy the example environment file:

```bash
# Windows PowerShell
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

The default configuration should work fine for most cases:

- **PORT**: 3000
- **DATA_DIR**: ./data

### Step 3: Start the Server

```bash
npm start
```

You should see:

```
Task Manager API running on http://localhost:3000
Data directory: ./data
```

Congratulations! Your server is now running. 🎉

## Your First Task

Let's create your first task using both the API and CLI.

### Using cURL (API)

Open a new terminal and run:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"My First Task\", \"description\": \"Learning Task Manager API\"}"
```

You'll receive a response like:

```json
{
  "success": true,
  "task": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "title": "My First Task",
    "description": "Learning Task Manager API",
    "completed": false,
    "createdAt": "2025-11-21T10:30:00.000Z",
    "updatedAt": "2025-11-21T10:30:00.000Z"
  }
}
```

Save the `id` field - you'll need it later!

### Using CLI

Alternatively, you can use the CLI:

```bash
npm run cli add "My First Task" -d "Learning Task Manager API"
```

You'll see a colorful output:

```
✓ Task created successfully!

○ [a1b2c3d4] My First Task
  Learning Task Manager API
  Created: 11/21/2025, 10:30:00 AM
```

## Using the REST API

### Viewing All Tasks

```bash
curl http://localhost:3000/api/tasks
```

Response:

```json
{
  "success": true,
  "count": 1,
  "tasks": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "My First Task",
      "description": "Learning Task Manager API",
      "completed": false,
      "createdAt": "2025-11-21T10:30:00.000Z",
      "updatedAt": "2025-11-21T10:30:00.000Z"
    }
  ]
}
```

### Filtering Tasks by Status

Get only pending tasks:

```bash
curl "http://localhost:3000/api/tasks?status=pending"
```

Get only completed tasks:

```bash
curl "http://localhost:3000/api/tasks?status=completed"
```

### Getting a Specific Task

```bash
curl http://localhost:3000/api/tasks/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

### Updating a Task

Mark a task as completed:

```bash
curl -X PUT http://localhost:3000/api/tasks/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \
  -H "Content-Type: application/json" \
  -d "{\"completed\": true}"
```

Update the title and description:

```bash
curl -X PUT http://localhost:3000/api/tasks/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"Updated Task\", \"description\": \"New description\"}"
```

### Deleting a Task

```bash
curl -X DELETE http://localhost:3000/api/tasks/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

Response:

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Using the CLI

The CLI provides a user-friendly interface for quick task management.

### Listing Tasks

List all tasks:

```bash
npm run cli list
```

List only completed tasks:

```bash
npm run cli list --completed
```

List only pending tasks:

```bash
npm run cli list --pending
```

### Adding Tasks

Simple task:

```bash
npm run cli add "Buy groceries"
```

Task with description:

```bash
npm run cli add "Finish homework" -d "Math and Physics assignments"
```

### Viewing Task Details

```bash
npm run cli view a1b2c3d4
```

**Note**: You can use just the first 8 characters of the task ID.

### Completing a Task

```bash
npm run cli complete a1b2c3d4
```

The task will be marked as completed and displayed with a green checkmark (✓).

### Deleting a Task

```bash
npm run cli delete a1b2c3d4
```

## Advanced Usage

### Building a Daily Task List

Let's create a complete daily task list:

```bash
# Morning tasks
npm run cli add "Morning exercise" -d "30 minutes cardio"
npm run cli add "Check emails" -d "Respond to urgent messages"

# Work tasks
npm run cli add "Team meeting" -d "10:00 AM - Sprint planning"
npm run cli add "Code review" -d "Review PR #123"
npm run cli add "Write documentation" -d "API endpoints"

# Evening tasks
npm run cli add "Grocery shopping" -d "Milk, bread, vegetables"
npm run cli add "Read book" -d "Chapter 5 and 6"
```

List all pending tasks:

```bash
npm run cli list --pending
```

### Using with Postman or Other HTTP Clients

1. **Import Collection**: You can import these endpoints into Postman or similar tools
2. **Base URL**: `http://localhost:3000`
3. **Headers**: Set `Content-Type: application/json` for POST/PUT requests

Example Postman request:

- **Method**: POST
- **URL**: `http://localhost:3000/api/tasks`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "title": "Deploy to production",
  "description": "Deploy version 1.0.0"
}
```

### Integrating with Your Own Applications

You can integrate the Task Manager API into your own applications:

**JavaScript Example (Node.js/Browser)**:

```javascript
// Create a task
async function createTask(title, description) {
  const response = await fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  const data = await response.json();
  return data.task;
}

// Get all tasks
async function getTasks() {
  const response = await fetch("http://localhost:3000/api/tasks");
  const data = await response.json();
  return data.tasks;
}

// Usage
const task = await createTask("New Task", "Description here");
console.log("Created task:", task.id);

const allTasks = await getTasks();
console.log("Total tasks:", allTasks.length);
```

**Python Example**:

```python
import requests

# Create a task
def create_task(title, description=''):
    response = requests.post(
        'http://localhost:3000/api/tasks',
        json={'title': title, 'description': description}
    )
    return response.json()['task']

# Get all tasks
def get_tasks():
    response = requests.get('http://localhost:3000/api/tasks')
    return response.json()['tasks']

# Usage
task = create_task('New Task', 'Description here')
print(f"Created task: {task['id']}")

tasks = get_tasks()
print(f"Total tasks: {len(tasks)}")
```

### Working with the Data Files

Tasks are stored in `data/tasks.json`. You can directly inspect or manually edit this file if needed:

```bash
# View the data file (PowerShell)
Get-Content data\tasks.json | ConvertFrom-Json | ConvertTo-Json -Depth 10

# View the data file (Linux/Mac)
cat data/tasks.json | jq
```

**Warning**: Be careful when manually editing the JSON file. Always ensure it's valid JSON, or the application may fail to load tasks.

## Troubleshooting

### Server Won't Start

**Error**: `EADDRINUSE: address already in use`

**Solution**: Another process is using port 3000. Either:

1. Change the PORT in `.env` file to a different number (e.g., 3001)
2. Or stop the process using port 3000

### Tasks Not Persisting

**Check**: Ensure the `data` directory exists and is writable.

```bash
# Create data directory if missing
mkdir data
```

### CLI Commands Not Working

**Error**: `Cannot find module 'commander'`

**Solution**: Install dependencies:

```bash
npm install
```

### API Returns 404

**Check**:

1. Is the server running? Check for "Task Manager API running on..." message
2. Are you using the correct URL? Should be `http://localhost:3000`
3. Is the endpoint correct? Check the [API Documentation](#using-the-rest-api)

### Invalid JSON Error

When using curl, ensure JSON is properly formatted:

**Windows PowerShell**: Use double quotes and escape inner quotes:

```bash
curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d "{\"title\": \"My Task\"}"
```

**Linux/Mac**: Use single quotes around JSON:

```bash
curl -X POST http://localhost:3000/api/tasks -H 'Content-Type: application/json' -d '{"title": "My Task"}'
```

## Next Steps

Now that you've completed the tutorial, you can:

1. **Explore the Code**: Check out `src/TaskManager.js` to see how tasks are managed
2. **Generate Documentation**: Run `npm run docs` to generate full API documentation
3. **Extend the Application**: Add new features like:
   - Task priorities
   - Due dates
   - Categories/tags
   - Search functionality
4. **Deploy**: Deploy your API to a cloud platform (Heroku, Railway, etc.)

## Conclusion

You've successfully learned how to:

- ✅ Set up the Task Manager API
- ✅ Create, read, update, and delete tasks via REST API
- ✅ Use the CLI for quick task management
- ✅ Integrate the API with other applications
- ✅ Troubleshoot common issues

Happy task managing! 🚀

---

**Need Help?**

- Check the main [README.md](../../README.md) for more details
- Review the generated API documentation: `npm run docs`
- Examine the source code in the `src/` directory
