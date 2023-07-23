import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from "./redux/TaskSlice";
import { loadState } from "./redux/LocalStorage";

const store = configureStore({
  reducer: { TaskSlice },
  preloadedState: loadState(),
});

export default store;
