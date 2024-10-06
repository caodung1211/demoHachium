import React from "react";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import CreateTask from "../components/modal/createTask";
import useTaskController from "../controllers/user.controller";

const TaskManager: React.FC = () => {
  const {
    tasks,
    addTask,
    handleOpenDialog,
    handleCloseDialog,
    toggleTaskStatus,
    getFilteredTasks,
    filter,
    setFilter,
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    handleCloseSnackbar,
    openDialog,
  } = useTaskController();

  const filteredTasks = getFilteredTasks(filter);

  return (
    <Box sx={{ maxWidth: 1300, margin: "auto", padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Task Manager
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="task-filter-label">Filter Tasks</InputLabel>
          <Select
            labelId="task-filter-label"
            value={filter}
            label="Filter Tasks"
            onChange={(e) =>
              setFilter(e.target.value as "all" | "completed" | "incomplete")
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="incomplete">Incomplete</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={handleOpenDialog}
          sx={{
            width: 200,
            background: "#1976d2",
            borderRadius: "8px",
            color: "#FFFFFF",
            fontWeight: 600,
            padding: 1,
            marginBottom: 3,
          }}
        >
          + Add Task
        </Button>
      </Box>

      <List
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: 2,
          marginTop: 2,
        }}
      >
        {filteredTasks.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
            No results
          </Typography>
        ) : (
          filteredTasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: 1,
                marginTop: 1,
              }}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTaskStatus(task.id)}
              />
              <ListItemText
                primary={task.text}
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              />
            </ListItem>
          ))
        )}
      </List>

      <CreateTask
        open={openDialog}
        onClose={handleCloseDialog}
        onAddTask={addTask}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskManager;
