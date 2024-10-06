# Task Manager Application

## Getting Started

In the project directory, you can run:

### `npm i`
### `npm run start`

This will start the development server and run the application.

## Features

### 1. Task Management:

- Display a list of tasks with the option to mark them as completed or incomplete.
- Users can add new tasks through a dialog.

### 2. Task Filtering:

- Provides the ability to filter tasks by status: all (All), completed (Completed), and incomplete (Incomplete).

### 3. Add Task through Dialog:

- Users can add a new task by clicking the "Add Task" button, which opens a dialog to enter the task name.
- Yup is used to validate the input data. The task name must be at least 3 characters long.

### 4. Notification (Snackbar):

- Whenever a task is added or its status is changed, a notification is displayed at the top right of the screen.

### 5. User-friendly Interface:

- Utilizes Material UI for designing the user interface with components like `Typography`, `Button`, `Checkbox`, `Snackbar`, `List`, and `Dialog`.
- Completed tasks are displayed with a strikethrough text style.

### 6. Handling Task Status:

- Each task can be marked as completed or incomplete using a checkbox.
- The status of the task is updated and displayed with a strikethrough if completed.

## Mock API Configuration

### 1. Mock API Setup:

- Use a mock API tool (e.g., Mock Service Worker, axios-mock-adapter, miragejs, json-server) to simulate API endpoints.

### 2. API Endpoints:

- `API_URL`: https://670218b5b52042b542d92f5a.mockapi.io.
- `GET /tasks`: Returns a list of initial tasks.
- `POST /tasks`: Simulates adding a new task and returns the created task.

## How It Works

1. **Fetch Initial Data from Mock API**: When the application is launched, the list of tasks is fetched from the API and displayed.
2. **Add New Task**: New tasks are added to the task list and immediately displayed to the user.
3. **Manage Task Status**: Users can mark tasks as completed or incomplete, and the status is reflected in the UI.
4. **Display Notifications**: After adding or updating the task status, a notification appears to confirm the action.

## Technologies Used

- **React**: For building the user interface.
- **Material UI**: For UI design and components.
- **Yup**: For input validation when adding tasks.
- **Axios**: For API requests (or a mock API tool).
