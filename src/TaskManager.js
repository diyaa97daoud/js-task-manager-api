const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

/**
 * TaskManager class handles all task-related operations including CRUD operations
 * and persistence to the file system.
 *
 * @class TaskManager
 * @example
 * const taskManager = new TaskManager('./data');
 * const task = await taskManager.createTask('Buy groceries', 'Shopping list');
 */
class TaskManager {
  /**
   * Creates an instance of TaskManager.
   *
   * @constructor
   * @param {string} dataDir - The directory path where task data will be stored
   * @throws {Error} If dataDir is not provided or invalid
   */
  constructor(dataDir) {
    if (!dataDir) {
      throw new Error("Data directory path is required");
    }
    this.dataDir = dataDir;
    this.tasksFile = path.join(dataDir, "tasks.json");
    this._ensureDataDirectory();
  }

  /**
   * Ensures the data directory exists, creates it if it doesn't.
   *
   * @private
   * @returns {void}
   */
  _ensureDataDirectory() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
    if (!fs.existsSync(this.tasksFile)) {
      fs.writeFileSync(this.tasksFile, JSON.stringify([], null, 2));
    }
  }

  /**
   * Reads all tasks from the data file.
   *
   * @private
   * @returns {Array<Object>} Array of task objects
   * @throws {Error} If file reading or JSON parsing fails
   */
  _readTasks() {
    try {
      const data = fs.readFileSync(this.tasksFile, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading tasks:", error.message);
      return [];
    }
  }

  /**
   * Writes tasks to the data file.
   *
   * @private
   * @param {Array<Object>} tasks - Array of task objects to save
   * @returns {void}
   * @throws {Error} If file writing fails
   */
  _writeTasks(tasks) {
    fs.writeFileSync(this.tasksFile, JSON.stringify(tasks, null, 2));
  }

  /**
   * Creates a new task with the given title and description.
   *
   * @param {string} title - The title of the task
   * @param {string} [description=''] - Optional description of the task
   * @returns {Object} The newly created task object
   * @throws {Error} If title is not provided
   * @example
   * const task = taskManager.createTask('Complete project', 'Finish by Friday');
   * console.log(task.id); // '123e4567-e89b-12d3-a456-426614174000'
   */
  createTask(title, description = "") {
    if (!title || title.trim() === "") {
      throw new Error("Task title is required");
    }

    const tasks = this._readTasks();
    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    this._writeTasks(tasks);
    return newTask;
  }

  /**
   * Retrieves all tasks from storage.
   *
   * @returns {Array<Object>} Array of all task objects
   * @example
   * const allTasks = taskManager.getAllTasks();
   * console.log(`Total tasks: ${allTasks.length}`);
   */
  getAllTasks() {
    return this._readTasks();
  }

  /**
   * Retrieves a single task by its ID.
   *
   * @param {string} id - The unique identifier of the task
   * @returns {Object|null} The task object if found, null otherwise
   * @throws {Error} If id is not provided
   * @example
   * const task = taskManager.getTaskById('123e4567-e89b-12d3-a456-426614174000');
   */
  getTaskById(id) {
    if (!id) {
      throw new Error("Task ID is required");
    }

    const tasks = this._readTasks();
    return tasks.find((task) => task.id === id) || null;
  }

  /**
   * Updates an existing task with new data.
   *
   * @param {string} id - The unique identifier of the task to update
   * @param {Object} updates - Object containing fields to update
   * @param {string} [updates.title] - New title for the task
   * @param {string} [updates.description] - New description for the task
   * @param {boolean} [updates.completed] - New completion status
   * @returns {Object|null} The updated task object if found, null otherwise
   * @throws {Error} If id is not provided
   * @example
   * const updated = taskManager.updateTask('123...', { completed: true });
   */
  updateTask(id, updates) {
    if (!id) {
      throw new Error("Task ID is required");
    }

    const tasks = this._readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return null;
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    this._writeTasks(tasks);
    return updatedTask;
  }

  /**
   * Deletes a task by its ID.
   *
   * @param {string} id - The unique identifier of the task to delete
   * @returns {boolean} True if task was deleted, false if not found
   * @throws {Error} If id is not provided
   * @example
   * const deleted = taskManager.deleteTask('123e4567-e89b-12d3-a456-426614174000');
   */
  deleteTask(id) {
    if (!id) {
      throw new Error("Task ID is required");
    }

    const tasks = this._readTasks();
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (filteredTasks.length === tasks.length) {
      return false;
    }

    this._writeTasks(filteredTasks);
    return true;
  }

  /**
   * Filters tasks by completion status.
   *
   * @param {boolean} completed - True to get completed tasks, false for incomplete
   * @returns {Array<Object>} Filtered array of task objects
   * @example
   * const completedTasks = taskManager.getTasksByStatus(true);
   * const pendingTasks = taskManager.getTasksByStatus(false);
   */
  getTasksByStatus(completed) {
    const tasks = this._readTasks();
    return tasks.filter((task) => task.completed === completed);
  }
}

module.exports = TaskManager;
