import { createSlice } from "@reduxjs/toolkit";
import { saveState } from "./LocalStorage";

const taskSlice = createSlice({
  name: "taskSlice",
  initialState: {},
  reducers: {
    addProject: (state, action) => {
      state[action.payload] = { todo: [], doing: [], done: [] };
      let copyState = { ...state };
      saveState(copyState);
    },
    removeProject: (state, action) => {
      delete state[action.payload];
      let copyState = { ...state };
      saveState(copyState);
    },
    renameProject: (state, action) => {
      if (action.payload[1] !== action.payload[0]) {
        state[action.payload[1]] = state[action.payload[0]];
        delete state[action.payload[0]];
      }
      let copyState = { ...state };
      saveState(copyState);
    },
    addTask: (state, action) => {
      let p_name = action.payload[0];
      let data = action.payload[1];
      let status = action.payload[2];
      let obj = {
        ...state[p_name],
        [status]: [...state[p_name][status], data],
      };
      state[action.payload[0]] = obj;

      let copyState = { ...state };
      saveState(copyState);
    },
    removeTask: (state, action) => {
      let project = action.payload[0];
      let data = action.payload[1];
      let status = data.status;

      let id = data.id;
      state[project][status] = state[project][status].filter(
        (item) => item.id !== id,
      );

      let copyState = { ...state };
      saveState(copyState);
    },
    updateTask: (state, action) => {
      let project = action.payload[0];
      let data = action.payload[1];
      let status = action.payload[2];
      let id = data.id;

      state[project][status] = state[project][status].filter(
        (item) => item.id !== id,
      );

      let obj = {
        ...state[project],
        [data.status]: [...state[project][data.status], data],
      };

      state[action.payload[0]] = obj;

      let copyState = { ...state };
      saveState(copyState);
    },

    updateIndex: (state, action) => {
      let project = action.payload[0];
      let data = action.payload[1];
      state[project] = data;
      let copyState = { ...state };
      saveState(copyState);
    },
    updateChangeIndex: (state, action) => {
      let project = action.payload[0];
      let prev_status = action.payload[1];
      let new_status = action.payload[2];
      let prev_data = action.payload[3];
      let new_data = action.payload[4];
      state[project][prev_status] = prev_data;
      state[project][new_status] = new_data;
      let copyState = { ...state };
      saveState(copyState);
    },
  },
});

export const {
  addProject,
  removeProject,
  renameProject,
  addTask,
  removeTask,
  updateTask,
  updateIndex,
  updateChangeIndex,
} = taskSlice.actions;

export default taskSlice.reducer;
