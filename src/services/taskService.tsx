// src/services/taskService.tsx
import axios from "axios";

// URL của API được lấy từ biến môi trường
// const API_URL = process.env.REACT_APP_API_URL;
const API_URL =
  process.env.REACT_APP_API_URL ??
  "https://670218b5b52042b542d92f5a.mockapi.io";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/listTask`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (newTask: {
  text: string;
  completed: boolean;
}): Promise<Task> => {
  try {
    const response = await axios.post(API_URL, newTask);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTaskStatus = async (
  taskId: number,
  updatedTask: { completed: boolean }
): Promise<Task> => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
