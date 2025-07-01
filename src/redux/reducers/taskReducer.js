import { createSlice } from '@reduxjs/toolkit';

export const taskReducer = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTasksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTaskSuccess: (state, action) => {
      state.tasks.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTaskSuccess: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTaskSuccess: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = taskReducer.actions;

export default taskReducer.reducer;
