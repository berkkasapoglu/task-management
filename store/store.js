import { configureStore } from "@reduxjs/toolkit"
import modalReducer from "./modal/modalSlice"
import taskReducer from "./task/taskSlice"

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    tasks: taskReducer,
  },
})
