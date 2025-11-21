# Task Manager API

A RESTful API service for managing tasks with file-based storage and CLI support. This project demonstrates a complete Node.js application with proper documentation, external dependencies, and both API and command-line interfaces.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

## Features

- 📝 **CRUD Operations**: Create, read, update, and delete tasks
- 🔌 **REST API**: Full-featured HTTP API with Express.js
- 💻 **CLI Interface**: Command-line tool for task management
- 💾 **File-based Storage**: Persistent JSON storage
- 📚 **Comprehensive Documentation**: JSDoc comments and generated API docs
- 🎨 **Colorful CLI**: Beautiful terminal output with chalk

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [CLI Usage](#cli-usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn

### Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd task-manager-api
```

2. Install dependencies:

```bash
npm install
```

3. Create environment configuration:

```bash
copy .env.example .env
```

4. Edit `.env` file if needed to configure:
   - `PORT`: Server port (default: 3000)
   - `DATA_DIR`: Data directory path (default: ./data)

## Quick Start

### Starting the API Server

```bash
npm start
```

The API will be available at `http://localhost:3000`

### Using the CLI

List all tasks:

```bash
npm run cli list
```

Add a new task:

```bash
npm run cli add "Buy groceries" -d "Milk, eggs, bread"
```

## API Documentation

### Endpoints

#### Health Check

```
GET /
GET /health
```

#### Tasks

**Get all tasks**

```
GET /api/tasks
Query Parameters:
  - status: 'completed' | 'pending' (optional)
```

**Get task by ID**

```
GET /api/tasks/:id
```

**Create a task**

```
POST /api/tasks
Body:
{
  "title": "Task title",
  "description": "Task description" (optional)
}
```

**Update a task**

```
PUT /api/tasks/:id
Body:
{
  "title": "Updated title" (optional),
  "description": "Updated description" (optional),
  "completed": true (optional)
}
```

**Delete a task**

```
DELETE /api/tasks/:id
```

### Example API Usage

Create a task:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Complete tutorial"}'
```

Get all tasks:

```bash
curl http://localhost:3000/api/tasks
```

## CLI Usage

The CLI provides a convenient interface for managing tasks from the terminal.

### Commands

**List tasks**

```bash
npm run cli list                 # All tasks
npm run cli list --completed     # Completed tasks only
npm run cli list --pending       # Pending tasks only
```

**Add a task**

```bash
npm run cli add "Task title"
npm run cli add "Task title" -d "Description"
```

**View a task**

```bash
npm run cli view <task-id>
```

**Complete a task**

```bash
npm run cli complete <task-id>
```

**Delete a task**

```bash
npm run cli delete <task-id>
```

**Note**: For task IDs, you can use the first 8 characters displayed in the list.

## Project Structure

```
task-manager-api/
├── src/
│   ├── server.js           # Express API server
│   ├── cli.js              # Command-line interface
│   └── TaskManager.js      # Core task management logic
├── data/                   # Task data storage (JSON files)
├── docs/
│   └── tutorials/          # Tutorial documentation
├── package.json            # Project dependencies and scripts
├── .env.example            # Environment configuration template
├── .gitignore             # Git ignore rules
├── LICENSE                # MIT License
└── README.md              # This file
```

## Dependencies

### Production Dependencies

- **express** (^4.18.2): Web framework for the REST API
- **dotenv** (^16.3.1): Environment variable management
- **uuid** (^9.0.1): UUID generation for task IDs
- **commander** (^11.1.0): CLI argument parsing
- **chalk** (^4.1.2): Terminal output styling

### Development Dependencies

- **jsdoc** (^4.0.2): API documentation generation

## Development

### Generate API Documentation

Generate reference documentation from JSDoc comments:

```bash
npm run docs
```

This will create HTML documentation in the `out/` directory. Open `out/index.html` in your browser to view it.

### Running in Development Mode

```bash
npm run dev
```

### Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test task", "description": "Testing the API"}'

# Get all tasks
curl http://localhost:3000/api/tasks

# Update a task
curl -X PUT http://localhost:3000/api/tasks/<task-id> \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:3000/api/tasks/<task-id>
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow existing code style
- Add JSDoc comments for all functions and classes
- Test your changes thoroughly
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created as part of TFSD course requirements.

## Acknowledgments

- Built with Node.js and Express
- Uses file-based storage for simplicity
- Inspired by modern task management tools
