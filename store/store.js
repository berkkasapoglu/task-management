import { configureStore } from "@reduxjs/toolkit"
import modalReducer from "./slices/modalSlice"
import taskReducer from "./slices/taskSlice"

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    tasks: taskReducer
  }
})