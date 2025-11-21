# Documentation Guide

This document explains how to generate and view the reference documentation for the Task Manager API project.

## Overview

The project uses **JSDoc** to generate comprehensive API documentation from the inline comments in the source code.

## Prerequisites

Make sure you have installed all dependencies:

```bash
npm install
```

This will install JSDoc as a dev dependency.

## Generating Documentation

To generate the HTML documentation, run:

```bash
npm run docs
```

This command does the following:

1. Reads all JavaScript files in the `src/` directory
2. Extracts JSDoc comments from the code
3. Generates HTML documentation in the `out/` directory

### What Gets Documented

The documentation includes:

- **Classes**: `TaskManager` class with all its methods
- **Functions**: All public and private methods
- **Parameters**: Detailed parameter descriptions with types
- **Return Values**: What each function returns
- **Examples**: Code examples showing how to use the API
- **Throws**: Exceptions that may be thrown

## Viewing the Documentation

After running `npm run docs`, you can view the documentation:

### Windows PowerShell

```powershell
Start-Process "out\index.html"
```

### Linux/Mac

```bash
open out/index.html    # Mac
xdg-open out/index.html  # Linux
```

Or simply navigate to the `out/` directory and open `index.html` in your browser.

## Documentation Structure

The generated documentation includes:

- **Home Page** (`index.html`): Overview and table of contents
- **Classes**: Detailed documentation for `TaskManager`
- **Methods**: Each method with:
  - Description
  - Parameters (with types)
  - Return values
  - Examples
  - Exceptions
- **Source Code**: Links to the actual source files

## JSDoc Configuration

The documentation is configured via `jsdoc.json`:

```json
{
  "source": {
    "include": ["src"],
    "includePattern": ".js$"
  },
  "opts": {
    "destination": "./out",
    "recurse": true,
    "readme": "./README.md"
  }
}
```

### Configuration Details

- **source.include**: Directories to scan for JavaScript files
- **source.includePattern**: Regular expression for file matching
- **opts.destination**: Where to output the generated docs
- **opts.recurse**: Whether to scan subdirectories
- **opts.readme**: README file to include in the documentation

## Customizing Documentation

### Adding More Examples

You can add examples to any function using the `@example` tag:

```javascript
/**
 * Creates a new task
 *
 * @example
 * const task = taskManager.createTask('My Task', 'Description');
 * console.log(task.id);
 *
 * @example
 * // Create without description
 * const task = taskManager.createTask('Simple Task');
 */
```

### Documenting New Functions

When adding new functions, follow this template:

```javascript
/**
 * Brief description of what the function does
 *
 * @param {Type} paramName - Description of parameter
 * @param {Type} [optionalParam] - Optional parameter description
 * @returns {ReturnType} Description of return value
 * @throws {Error} When this error occurs
 * @example
 * const result = myFunction('value');
 */
function myFunction(paramName, optionalParam) {
  // Implementation
}
```

### JSDoc Tags Reference

Common tags used in this project:

- `@class`: Marks a function as a class constructor
- `@constructor`: Alternative to @class
- `@param {Type} name - Description`: Documents parameters
- `@returns {Type} Description`: Documents return values
- `@throws {Type} Description`: Documents thrown exceptions
- `@example`: Provides usage examples
- `@private`: Marks as internal/private
- `@see`: Links to related documentation

## Continuous Documentation

### Best Practices

1. **Document as you code**: Add JSDoc comments while writing functions
2. **Include examples**: Especially for public APIs
3. **Keep it updated**: Update docs when changing function signatures
4. **Be specific**: Use proper types (`{string}`, `{Array<Object>}`, etc.)

### Regenerating Docs

The `out/` directory is in `.gitignore`, so you need to regenerate docs after:

- Cloning the repository
- Pulling changes that modify source code
- Making local changes to documented functions

Simply run `npm run docs` again.

## Troubleshooting

### Command Not Found

**Error**: `'jsdoc' is not recognized...`

**Solution**: Install dependencies

```bash
npm install
```

### No Documentation Generated

**Check**:

1. Is there an `out/` directory? If not, JSDoc may have failed
2. Check for syntax errors in JSDoc comments
3. Verify `jsdoc.json` configuration is valid

### Outdated Documentation

**Solution**: Always regenerate after code changes

```bash
npm run docs
```

## Example Output

After running `npm run docs`, you should see output like:

```
Parsing d:\CPS2\M1\First sem\TFSD\lecture 6\New folder\src\TaskManager.js ...
Parsing d:\CPS2\M1\First sem\TFSD\lecture 6\New folder\src\server.js ...
Parsing d:\CPS2\M1\First sem\TFSD\lecture 6\New folder\src\cli.js ...
Generating output files...
Documentation generated in out/
```

## Next Steps

- Open `out/index.html` to view the documentation
- Share the `out/` directory or host it on GitHub Pages
- Use the documentation as a reference while developing

## Additional Resources

- [JSDoc Official Documentation](https://jsdoc.app/)
- [JSDoc Tags Reference](https://jsdoc.app/index.html#block-tags)
- Project README: [README.md](../README.md)
- Tutorial: [docs/tutorials/tutorial.md](tutorials/tutorial.md)
