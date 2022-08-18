import { createSlice } from "@reduxjs/toolkit"
import {
  fetchTasks,
  addGroup,
  editGroup,
  addColumn,
  addTask,
  dragTask,
} from "./taskActions"

const initialState = {
  taskGroups: [],
  selectedGroup: "",
}

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    selectGroup: (state, action) => {
      state.selectedGroup = action.payload.group
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.taskGroups = action.payload
    }),
      builder.addCase(addGroup.fulfilled, (state, action) => {
        const group = action.payload
        state.taskGroups.push(group)
      }),
      builder.addCase(editGroup.fulfilled, (state, action) => {
        const group = action.payload
        let editedGroup = state.taskGroups.find(
          (groupItem) => groupItem.id === state.selectedGroup.id
        )
        for (let key in editedGroup) {
          editedGroup[key] = group[key]
        }
        state.selectedGroup = editedGroup
      }),
      builder.addCase(addColumn.fulfilled, (state, action) => {
        const newColumn = action.payload
        const selectedGroup = state.taskGroups.find(
          (group) => group.id === newColumn.groupId
        )
        selectedGroup
          ? selectedGroup.columns.push(newColumn)
          : state.taskGroups.push(newColumn)
      }),
      builder.addCase(addTask.fulfilled, (state, action) => {
        const newTask = action.payload
        const columns = state.taskGroups.find(
          (group) => group.id === state.selectedGroup.id
        ).columns
        const tasks = columns.find(
          (column) => column.id === newTask.columnId
        ).tasks
        tasks.push(newTask)
      }),
      builder.addCase(dragTask.fulfilled, (state, action) => {
        const updatedGroup = state.taskGroups.find(
          (group) => group.id === state.selectedGroup.id
        )
        updatedGroup.columns = action.payload
      })
  },
})

export const { selectGroup } = taskSlice.actions

export default taskSlice.reducer
