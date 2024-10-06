import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import * as Yup from "yup";

const taskSchema = Yup.object().shape({
  newTask: Yup.string()
    .required("Task name is required")
    .min(3, "Task name must be at least 3 characters long"),
});

interface CreateTaskProps {
  open: boolean;
  onClose: () => void;
  onAddTask: (task: string) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  open,
  onClose,
  onAddTask,
}) => {
  const [newTask, setNewTask] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = async () => {
    try {
      await taskSchema.validate({ newTask });
      onAddTask(newTask);
      setNewTask("");
      onClose();
      setError(null);
    } catch (validationError: any) {
      setError(validationError.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the name of your new task below:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="New Task"
          fullWidth
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddTask} color="primary" variant="contained">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTask;
