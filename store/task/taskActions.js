import { createAsyncThunk } from "@reduxjs/toolkit"
import { setGroups, setColumns, setTasks } from "./taskSlice"

//Deletes object properties except id
const normalize = (data, key) => {
  return data.map((item) => ({
    ...item,
    [key]: item[key].map(({ id }) => id),
  }))
}

const fetchTasks = createAsyncThunk(
  "/api/fetchTasks",
  async (_, { dispatch }) => {
    const res = await fetch("api/groups")
    const data = await res.json()
    const groups = normalize(data, "columns")
    const columnsUnNormalized = data.map((group) => group.columns).flat()
    const columns = normalize(columnsUnNormalized, "tasks")
    const taskUnNormalized = columnsUnNormalized
      .map((column) => column.tasks)
      .flat()
    // const tasks = normalize(taskUnNormalized, "subtasks")
    return { groups, columns, tasks: taskUnNormalized }
  }
)

const addGroup = createAsyncThunk("/api/addGroup", async (data) => {
  const res = await fetch("api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  const newGroup = await res.json()
  if (!res.ok) throw Error("Group can't added.")
  return newGroup
})

const deleteGroup = createAsyncThunk("/api/deleteGroup", async (id) => {
  const res = await fetch(`api/groups/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw Error("Group can't deleted.")
  return id
})

const editGroup = createAsyncThunk("api/editGroup", async ({ id, group }) => {
  const res = await fetch(`/api/groups/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  })
  if (!res.ok) throw Error("Group is not updated.")
  const editedGroup = await res.json()
  return { group: editedGroup, removedColumns: group.removedColumns }
})

const addColumn = createAsyncThunk("api/addColumn", async (data) => {
  const res = await fetch("/api/columns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw Error("Can't Add Column.")
  const taskColumns = await res.json()
  return taskColumns
})

const addTask = createAsyncThunk("api/addTask", async (data) => {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  const task = await res.json()
  if (!res.ok) throw Error("Can't Add Task.")
  return task
})

export const deleteTask = createAsyncThunk(
  "api/deleteTask",
  async ({ id, columnId }) => {
    const res = await fetch(`api/tasks/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw Error("Can't Delete Task.")
    return { id, columnId }
  }
)

export const editTask = createAsyncThunk("api/editTask", async (data) => {
  const res = await fetch(`api/tasks/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw Error("Can't Update Task.")
  const updatedTask = await res.json()
  return updatedTask
})

const dragTask = createAsyncThunk("api/dragTask", async (data) => {
  const res = await fetch(`/api/columns`, {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw Error("Can't Drag Task.")
  const updatedColumns = await res.json()
  return updatedColumns
})

const editSubtask = createAsyncThunk("api/editSubtask", async (data) => {
  const res = await fetch(`/api/subtasks`, {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw Error("Can't Edit Subtask.")
  return data
})

export {
  fetchTasks,
  addGroup,
  deleteGroup,
  editGroup,
  addColumn,
  addTask,
  dragTask,
  editSubtask,
}
