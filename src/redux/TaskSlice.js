import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "taskSlice",
  initialState: {},
  reducers: {
    addProject: (state, action) => {
      state[action.payload] = [];
    },
    removeProject: (state, action) => {
      delete state[action.payload];
    },
    renameProject: (state, action) => {
      if (action.payload[1] !== action.payload[0]) {
        state[action.payload[1]] = state[action.payload[0]];
        delete state[action.payload[0]];
      }
    },
  },
});

export const { addProject, removeProject, renameProject } = taskSlice.actions;

export default taskSlice.reducer;
