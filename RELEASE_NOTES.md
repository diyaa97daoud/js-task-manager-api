# Task Manager API v1.0.0

First stable release of the Task Manager API - A RESTful API service for managing tasks with file-based storage and CLI support.

## 🎉 Features

- ✅ Complete REST API with Express.js
- ✅ Command-line interface (CLI) tool
- ✅ File-based persistent storage
- ✅ Full JSDoc documentation
- ✅ Comprehensive tutorial
- ✅ MIT License

## 📦 What's Included

### API Endpoints

- `GET /api/tasks` - Get all tasks (with optional status filter)
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /health` - Health check

### CLI Commands

- `list` - List all tasks (with --completed/--pending filters)
- `add` - Create new task
- `view` - View task details
- `complete` - Mark task as completed
- `delete` - Delete task

### Core Features

- Task CRUD operations
- UUID-based task identification
- Automatic timestamps (createdAt, updatedAt)
- File-based JSON storage
- Task status filtering
- Input validation
- Error handling

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/diyaa97daoud/js-task-manager-api.git
   cd js-task-manager-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the API server:

   ```bash
   npm start
   ```

4. Or use the CLI:
   ```bash
   npm run cli list
   ```

## 📚 Documentation

- **README**: Complete setup and usage guide at [README.md](https://github.com/diyaa97daoud/js-task-manager-api/blob/main/README.md)
- **Tutorial**: Step-by-step tutorial at [docs/tutorials/tutorial.md](https://github.com/diyaa97daoud/js-task-manager-api/blob/main/docs/tutorials/tutorial.md)
- **API Reference**: Generate with `npm run docs` (requires JSDoc)
- **Documentation Guide**: [docs/DOCUMENTATION.md](https://github.com/diyaa97daoud/js-task-manager-api/blob/main/docs/DOCUMENTATION.md)

## 🔗 Dependencies

### Production

- `express` ^4.18.2 - Web framework
- `dotenv` ^16.3.1 - Environment configuration
- `uuid` ^9.0.1 - Unique ID generation
- `commander` ^11.1.0 - CLI framework
- `chalk` ^4.1.2 - Terminal styling

### Development

- `jsdoc` ^4.0.2 - Documentation generation

## 🛠️ Technical Details

- **Language**: JavaScript (Node.js)
- **Minimum Node Version**: 14.0.0
- **Storage**: JSON file-based
- **Documentation**: JSDoc comments throughout
- **License**: MIT

## 📝 What's New in v1.0.0

- Initial release with complete feature set
- Full REST API implementation
- CLI tool with colorful output
- Comprehensive JSDoc documentation
- Step-by-step tutorial
- MIT License
- Production-ready codebase

## 🎯 Use Cases

- Personal task management
- Learning REST API development
- Example project for Node.js/Express
- Base for more complex task management systems
- Educational purposes

## 📖 Quick Examples

### API Example

```bash
# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Deploy app", "description": "Deploy to production"}'

# Get all tasks
curl http://localhost:3000/api/tasks
```

### CLI Example

```bash
# Add a task
npm run cli add "Buy groceries" -d "Milk, eggs, bread"

# List all tasks
npm run cli list

# Mark as complete
npm run cli complete <task-id>
```

## 🤝 Contributing

Contributions are welcome! Please read the contributing section in [README.md](https://github.com/diyaa97daoud/js-task-manager-api/blob/main/README.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/diyaa97daoud/js-task-manager-api/blob/main/LICENSE) file for details.
