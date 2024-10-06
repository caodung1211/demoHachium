// src/hooks/useTask.tsx
import { useState, useEffect } from "react";
import {
  fetchTasks,
  addTask as addTaskAPI,
  updateTaskStatus,
  Task,
} from "../services/taskService";

type Filter = "all" | "completed" | "incomplete";

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy task từ API khi component được mount
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

  // Thêm task mới và cập nhật danh sách task
  const addTask = async (newTask: string) => {
    if (newTask.trim() === "") return;
    const newTaskObject = {
      text: newTask,
      completed: false,
    };

    try {
      const addedTask = await addTaskAPI(newTaskObject);
      setTasks([...tasks, addedTask]);
    } catch (error) {
      setError("Error adding task");
    }
  };

  // Đánh dấu task hoàn thành/chưa hoàn thành
  const toggleTaskStatus = async (taskId: number) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      try {
        const updatedTask = await updateTaskStatus(taskId, {
          completed: !taskToUpdate.completed,
        });
        setTasks(
          tasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
      } catch (error) {
        setError("Error updating task status");
      }
    }
  };

  // Lọc các task dựa trên filter
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
    toggleTaskStatus,
    getFilteredTasks,
    filter,
    setFilter,
  };
};
