#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const TaskManager = require("./TaskManager");

/**
 * CLI program instance
 * @type {Command}
 */
const program = new Command();

/**
 * TaskManager instance for CLI operations
 * @type {TaskManager}
 */
const taskManager = new TaskManager("./data");

/**
 * Formats and displays a task object in the console
 *
 * @function displayTask
 * @param {Object} task - Task object to display
 * @param {string} task.id - Task ID
 * @param {string} task.title - Task title
 * @param {string} task.description - Task description
 * @param {boolean} task.completed - Completion status
 * @param {string} task.createdAt - Creation timestamp
 * @returns {void}
 */
function displayTask(task) {
  const status = task.completed ? chalk.green("✓") : chalk.yellow("○");
  console.log(
    `\n${status} [${chalk.cyan(task.id.substring(0, 8))}] ${chalk.bold(
      task.title
    )}`
  );
  if (task.description) {
    console.log(`  ${chalk.gray(task.description)}`);
  }
  console.log(
    `  ${chalk.gray("Created:")} ${new Date(task.createdAt).toLocaleString()}`
  );
}

/**
 * Displays a list of tasks in the console
 *
 * @function displayTasks
 * @param {Array<Object>} tasks - Array of task objects
 * @returns {void}
 */
function displayTasks(tasks) {
  if (tasks.length === 0) {
    console.log(chalk.yellow("\nNo tasks found."));
    return;
  }

  console.log(chalk.bold(`\nTotal tasks: ${tasks.length}`));
  tasks.forEach(displayTask);
  console.log("");
}

program
  .name("task-cli")
  .description("CLI tool for managing tasks")
  .version("1.0.0");

/**
 * @command list
 * @description List all tasks or filter by status
 */
program
  .command("list")
  .description("List all tasks")
  .option("-c, --completed", "Show only completed tasks")
  .option("-p, --pending", "Show only pending tasks")
  .action((options) => {
    try {
      let tasks;
      if (options.completed) {
        tasks = taskManager.getTasksByStatus(true);
        console.log(chalk.bold("\n📋 Completed Tasks:"));
      } else if (options.pending) {
        tasks = taskManager.getTasksByStatus(false);
        console.log(chalk.bold("\n📋 Pending Tasks:"));
      } else {
        tasks = taskManager.getAllTasks();
        console.log(chalk.bold("\n📋 All Tasks:"));
      }
      displayTasks(tasks);
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
    }
  });

/**
 * @command add
 * @description Add a new task
 */
program
  .command("add <title>")
  .description("Add a new task")
  .option("-d, --description <description>", "Task description")
  .action((title, options) => {
    try {
      const task = taskManager.createTask(title, options.description || "");
      console.log(chalk.green("\n✓ Task created successfully!"));
      displayTask(task);
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
    }
  });

/**
 * @command complete
 * @description Mark a task as completed
 */
program
  .command("complete <id>")
  .description("Mark a task as completed")
  .action((id) => {
    try {
      const task = taskManager.updateTask(id, { completed: true });
      if (!task) {
        console.log(chalk.red("\n✗ Task not found"));
        return;
      }
      console.log(chalk.green("\n✓ Task marked as completed!"));
      displayTask(task);
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
    }
  });

/**
 * @command delete
 * @description Delete a task
 */
program
  .command("delete <id>")
  .description("Delete a task")
  .action((id) => {
    try {
      const deleted = taskManager.deleteTask(id);
      if (!deleted) {
        console.log(chalk.red("\n✗ Task not found"));
        return;
      }
      console.log(chalk.green("\n✓ Task deleted successfully!"));
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
    }
  });

/**
 * @command view
 * @description View details of a specific task
 */
program
  .command("view <id>")
  .description("View task details")
  .action((id) => {
    try {
      const task = taskManager.getTaskById(id);
      if (!task) {
        console.log(chalk.red("\n✗ Task not found"));
        return;
      }
      displayTask(task);
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
    }
  });

program.parse(process.argv);
