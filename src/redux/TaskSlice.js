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
  },
});

export const { addProject, removeProject } = taskSlice.actions;

export default taskSlice.reducer;
