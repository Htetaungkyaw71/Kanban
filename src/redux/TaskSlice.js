import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "taskSlice",
  initialState: {},
  reducers: {
    addProject: (state, action) => {
      state[action.payload] = [];
    },
  },
});

export const { addProject } = taskSlice.actions;

export default taskSlice.reducer;
