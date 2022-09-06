import { createSlice } from "@reduxjs/toolkit"
import {
  fetchTasks,
  addGroup,
  deleteGroup,
  editGroup,
  addColumn,
  addTask,
  deleteTask,
  dragTask,
  editTask,
  editSubtask,
} from "./taskActions"
import { createEntityAdapter } from "@reduxjs/toolkit"

const groupAdapter = createEntityAdapter({
  selectId: (group) => group.id,
})

const columnAdapter = createEntityAdapter({
  selectId: (column) => column.id,
})

const taskAdapter = createEntityAdapter({
  selectId: (task) => task.id,
})

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    groups: groupAdapter.getInitialState(),
    columns: columnAdapter.getInitialState(),
    tasks: taskAdapter.getInitialState(),
    selectedGroup: "",
  },
  reducers: {
    selectGroup(state, action) {
      state.selectedGroup = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const { groups, columns, tasks } = action.payload
        groupAdapter.setAll(state.groups, groups)
        columnAdapter.setAll(state.columns, columns)
        taskAdapter.setAll(state.tasks, tasks)
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        const group = action.payload
        groupAdapter.addOne(state.groups, group)
        state.selectedGroup = group
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        const id = action.payload
        const removedColumnIds = state.groups.entities[id].columns
        const removedTaskIds = removedColumnIds
          .map((columnId) => state.columns.entities[columnId].tasks)
          .flat()
        columnAdapter.removeMany(state.columns, removedColumnIds)
        groupAdapter.removeOne(state.groups, id)
        taskAdapter.removeMany(state.tasks, removedTaskIds)
        state.selectedGroup = state.groups.entities[state.groups.ids[0]] || ""
      })
      .addCase(editGroup.fulfilled, (state, action) => {
        const { group, removedColumns } = action.payload
        groupAdapter.updateOne(state.groups, {
          id: group.id,
          changes: {
            ...group,
            columns: group.columns.map((column) => column.id),
          },
        })

        const columnUpdateObjects = group.columns.map((column) => ({
          id: column.id,
          ...column,
          tasks: column.tasks.map((task) => task.id),
        }))
        columnAdapter.setMany(state.columns, columnUpdateObjects)
        removedColumns.length &&
          columnAdapter.removeMany(state.columns, removedColumns)
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        const columnData = action.payload
        const group = groupAdapter
          .getSelectors()
          .selectById(state.groups, columnData.groupId)
        const newColumn = group ? columnData : columnData.columns[0]
        columnAdapter.addOne(state.columns, newColumn)
        group
          ? groupAdapter.updateOne(state.groups, {
              id: newColumn.groupId,
              changes: {
                columns: [...group.columns, newColumn.id],
              },
            })
          : groupAdapter.addOne(state.groups, {
              ...columnData,
              columns: columnData.columns.map((column) => column.id),
            })
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const newTask = action.payload
        taskAdapter.addOne(state.tasks, newTask)
        const column = columnAdapter
          .getSelectors()
          .selectById(state.columns, newTask.columnId)
        columnAdapter.updateOne(state.columns, {
          id: newTask.columnId,
          changes: {
            tasks: [...column.tasks, newTask.id],
          },
        })
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { id, columnId } = action.payload
        taskAdapter.removeOne(state.tasks, id)
        const tasksOnColumns = state.columns.entities[columnId].tasks
        columnAdapter.updateOne(state.columns, {
          id: columnId,
          changes: {
            tasks: tasksOnColumns.filter((taskId) => taskId !== id),
          },
        })
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const updatedTask = action.payload
        taskAdapter.setOne(state.tasks, updatedTask)
      })
      .addCase(dragTask.fulfilled, (state, action) => {
        const columns = action.payload
        const draggedColumns = columns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) => task.id),
        }))
        columnAdapter.setMany(state.columns, draggedColumns)
        taskAdapter.setMany(
          state.tasks,
          columns.map((column) => column.tasks).flat()
        )
      })
      .addCase(editSubtask.fulfilled, (state, action) => {
        const editedSubtask = action.payload
        const currentTask = state.tasks.entities[editedSubtask.taskId]
        taskAdapter.updateOne(state.tasks, {
          id: currentTask.id,
          changes: {
            subtasks: currentTask.subtasks.map((subtask) => {
              if (subtask.id === editedSubtask.id) {
                return editedSubtask
              }
              return subtask
            }),
          },
        })
      })
  },
})

export const groupSelectors = groupAdapter.getSelectors(
  (state) => state.tasks.groups
)
export const columnSelectors = columnAdapter.getSelectors(
  (state) => state.tasks.columns
)
export const taskSelectors = taskAdapter.getSelectors(
  (state) => state.tasks.tasks
)

export const selectColumnsByGroupId = (state, id) => {
  if (id) {
    const columnIds = state.tasks.groups.entities[id].columns
    return columnIds.map((columnId) => state.tasks.columns.entities[columnId])
  }
}

export const selectTasksByColumnId = (state, id) => {
  if (id) {
    const taskIds = state.tasks.columns.entities[id].tasks
    return taskIds.map((taskId) => state.tasks.tasks.entities[taskId])
  }
}

export const selectCurrentGroup = (state) => {
  return groupSelectors.selectById(state, state.tasks.selectedGroup.id)
}

export const { selectGroup, setGroups, setColumns, setTasks } =
  taskSlice.actions

export default taskSlice.reducer
