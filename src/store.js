import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from "./redux/TaskSlice";

const store = configureStore({
  reducer: { TaskSlice },
});

export default store;
