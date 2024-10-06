import { useState, useEffect } from "react";
import { fetchTasks, Task } from "../../../services/taskService";

type Filter = "all" | "completed" | "incomplete";

const useTaskController = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "warning"
  >("success");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching tasks");
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = (newTask: string) => {
    if (newTask.trim() === "") return;
    const newTaskObject = {
      id: tasks.length + 1,
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, newTaskObject]);
    setOpenDialog(false);
    showSnackbar("Task added successfully", "success");
  };

  // Mở dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Đóng dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const toggleTaskStatus = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    showSnackbar("Task status updated", "success");
  };

  // Mở snackbar với thông báo
  const showSnackbar = (message: string, severity: "success" | "warning") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const getFilteredTasks = (filter: Filter) => {
    return tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    });
  };

  return {
    tasks,
    loading,
    error,
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
  };
};

export default useTaskController;
