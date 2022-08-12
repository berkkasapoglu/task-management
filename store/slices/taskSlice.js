import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  taskGroups: [],
  selectedGroup: "",
}

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    replaceTasks: (state, action) => {
      state.taskGroups = action.payload
    },
    addTask: (state, action) => {
      const { column: columnName, task } = action.payload
      const columns = state.taskGroups[state.selectedGroup]
      columns.forEach((column) => {
        if (column.name === columnName) {
          column.tasks.push(task)
        }
      })
    },
    addGroup: (state, action) => {
      const { group } = action.payload
      console.log(action.payload, group)
      const isGroupListEmpty = state.taskGroups.length === 0
      state.taskGroups.push(group)
      if (isGroupListEmpty) state.selectedGroup = group
    },
    updateGroup: (state, action) => {
      state.taskGroups[state.selectedGroup] = action.payload
    },
    addColumn: (state, action) => {
      const newColumn = action.payload
      const selectedGroup = state.taskGroups.find(
        (group) => group.id === newColumn.groupId
      )
      selectedGroup.columns.push(newColumn)
    },
    selectGroup: (state, action) => {
      state.selectedGroup = action.payload.group
    },
  },
})

export const {
  addGroup,
  updateGroup,
  addColumn,
  addTask,
  selectGroup,
  replaceTasks,
} = taskSlice.actions

export default taskSlice.reducer
