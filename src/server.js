require("dotenv").config();
const express = require("express");
const TaskManager = require("./TaskManager");

/**
 * Express application instance for the Task Manager API
 * @type {express.Application}
 */
const app = express();

/**
 * Port number for the server, defaults to 3000
 * @constant {number}
 */
const PORT = process.env.PORT || 3000;

/**
 * Data directory path from environment or default
 * @constant {string}
 */
const DATA_DIR = process.env.DATA_DIR || "./data";

/**
 * TaskManager instance for handling task operations
 * @type {TaskManager}
 */
const taskManager = new TaskManager(DATA_DIR);

// Middleware
app.use(express.json());

/**
 * Middleware to log all incoming requests
 *
 * @function requestLogger
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/**
 * @api {get} / Health check endpoint
 * @apiName HealthCheck
 * @apiGroup General
 *
 * @apiSuccess {String} message Welcome message
 * @apiSuccess {String} version API version
 */
app.get("/", (req, res) => {
  res.json({
    message: "Task Manager API",
    version: "1.0.0",
    endpoints: {
      tasks: "/api/tasks",
      health: "/health",
    },
  });
});

/**
 * @api {get} /health Server health check
 * @apiName GetHealth
 * @apiGroup General
 *
 * @apiSuccess {String} status Server status
 */
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

/**
 * @api {get} /api/tasks Get all tasks
 * @apiName GetTasks
 * @apiGroup Tasks
 *
 * @apiQuery {String} [status] Filter by status (completed/pending)
 *
 * @apiSuccess {Array} tasks Array of task objects
 */
app.get("/api/tasks", (req, res) => {
  try {
    const { status } = req.query;
    let tasks;

    if (status === "completed") {
      tasks = taskManager.getTasksByStatus(true);
    } else if (status === "pending") {
      tasks = taskManager.getTasksByStatus(false);
    } else {
      tasks = taskManager.getAllTasks();
    }

    res.json({ success: true, count: tasks.length, tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @api {get} /api/tasks/:id Get task by ID
 * @apiName GetTaskById
 * @apiGroup Tasks
 *
 * @apiParam {String} id Task unique ID
 *
 * @apiSuccess {Object} task Task object
 * @apiError {String} error Error message if task not found
 */
app.get("/api/tasks/:id", (req, res) => {
  try {
    const task = taskManager.getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @api {post} /api/tasks Create a new task
 * @apiName CreateTask
 * @apiGroup Tasks
 *
 * @apiBody {String} title Task title (required)
 * @apiBody {String} [description] Task description
 *
 * @apiSuccess {Object} task Created task object
 * @apiError {String} error Validation error message
 */
app.post("/api/tasks", (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, error: "Title is required" });
    }

    const task = taskManager.createTask(title, description);
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @api {put} /api/tasks/:id Update a task
 * @apiName UpdateTask
 * @apiGroup Tasks
 *
 * @apiParam {String} id Task unique ID
 * @apiBody {String} [title] Updated task title
 * @apiBody {String} [description] Updated task description
 * @apiBody {Boolean} [completed] Updated completion status
 *
 * @apiSuccess {Object} task Updated task object
 * @apiError {String} error Error message if task not found
 */
app.put("/api/tasks/:id", (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updates = {};

    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (completed !== undefined) updates.completed = completed;

    const task = taskManager.updateTask(req.params.id, updates);

    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @api {delete} /api/tasks/:id Delete a task
 * @apiName DeleteTask
 * @apiGroup Tasks
 *
 * @apiParam {String} id Task unique ID
 *
 * @apiSuccess {String} message Success message
 * @apiError {String} error Error message if task not found
 */
app.delete("/api/tasks/:id", (req, res) => {
  try {
    const deleted = taskManager.deleteTask(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 404 handler for undefined routes
 */
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Endpoint not found" });
});

/**
 * Starts the Express server
 *
 * @function startServer
 * @returns {void}
 */
function startServer() {
  app.listen(PORT, () => {
    console.log(`Task Manager API running on http://localhost:${PORT}`);
    console.log(`Data directory: ${DATA_DIR}`);
  });
}

// Start server if run directly
if (require.main === module) {
  startServer();
}

module.exports = app;
