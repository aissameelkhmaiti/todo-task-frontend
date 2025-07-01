import axios from 'axios';
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} from '../reducers/taskReducer';

const API_URL = 'http://127.0.0.1:8000/api/tasks';

// Fonction pour récupérer le token depuis localStorage et préparer headers
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all tasks
export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const response = await axios.get(API_URL, getAuthConfig());
    dispatch(fetchTasksSuccess(response.data));
  } catch (error) {
    dispatch(fetchTasksFailure(error.response?.data?.message || error.message));
  }
};

// Add a new task
export const addTask = (taskData) => async (dispatch) => {
  dispatch(addTaskRequest());
  try {
    const response = await axios.post(API_URL, taskData, getAuthConfig());
    dispatch(addTaskSuccess(response.data));
  } catch (error) {
    dispatch(addTaskFailure(error.response?.data?.message || error.message));
  }
};

// Update an existing task
export const updateTask = (taskId, updatedData) => async (dispatch) => {
  dispatch(updateTaskRequest());
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, updatedData, getAuthConfig());
    dispatch(updateTaskSuccess(response.data));
  } catch (error) {
    dispatch(updateTaskFailure(error.response?.data?.message || error.message));
  }
};

// Delete a task
export const deleteTask = (taskId) => async (dispatch) => {
  dispatch(deleteTaskRequest());
  try {
    await axios.delete(`${API_URL}/${taskId}`, getAuthConfig());
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    dispatch(deleteTaskFailure(error.response?.data?.message || error.message));
  }
};
