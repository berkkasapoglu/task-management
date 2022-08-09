import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  taskGroups: {
    group1: [
      {
        name: "column1",
        tasks: [
          { title: "Task1", description: "Task1 Description", priority: "Low" },
        ],
      },
      {
        name: "column2",
        tasks: [
          { title: "Task2", description: "Task2 Description", priority: "High" },
        ],
      },
    ],
  },
  currentGroup: "group1",
}

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { column: columnName, task } = action.payload
      const columns = state.taskGroups[state.currentGroup]
      columns.forEach((column) => {
        if (column.name === columnName) {
          column.tasks.push(task)
        }
      })
    },
    addGroup: (state, action) => {
      const { group } = action.payload
      const isGroupListEmpty = Object.keys(state.taskGroups).length === 0
      state.taskGroups[group] = []
      if (isGroupListEmpty) state.currentGroup = group
    },
    updateGroup: (state, action) => {
      state.taskGroups[state.currentGroup] = action.payload
    },
    addColumn: (state, action) => {
      const { group, column } = action.payload
      const newColumn = {
        name: column,
        tasks: [],
      }
      const groups = state.taskGroups[group]
      groups = groups || []
      groups.push(newColumn)
    },
    selectGroup: (state, action) => {
      state.currentGroup = action.payload.group
    },
  },
})

export const { addGroup, updateGroup, addColumn, addTask, selectGroup } =
  taskSlice.actions

export default taskSlice.reducer
