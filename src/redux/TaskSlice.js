import { createSlice } from "@reduxjs/toolkit";
import { saveState } from "./LocalStorage";

const taskSlice = createSlice({
  name: "taskSlice",
  initialState: {},
  reducers: {
    addProject: (state, action) => {
      state[action.payload] = [];
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
      state[action.payload[0]] = [
        action.payload[1],
        ...state[action.payload[0]],
      ];
      let copyState = { ...state };
      saveState(copyState);
    },
    removeTask: (state, action) => {
      state[action.payload[0]] = state[action.payload[0]].filter(
        (data) => data.id !== action.payload[1].id,
      );
      let copyState = { ...state };
      saveState(copyState);
    },
    updateTask: (state, action) => {
      state[action.payload[0]] = state[action.payload[0]].filter(
        (data) => data.id !== action.payload[1].id,
      );
      state[action.payload[0]] = [
        action.payload[1],
        ...state[action.payload[0]],
      ];
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
} = taskSlice.actions;

export default taskSlice.reducer;
