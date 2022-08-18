import { createAsyncThunk } from "@reduxjs/toolkit"

const fetchTasks = createAsyncThunk("/api/fetchTasks", async () => {
  const res = await fetch("api/groups")
  const taskGroups = await res.json()
  return taskGroups
})

const addGroup = createAsyncThunk("/api/addGroup", async (data) => {
  const res = await fetch("api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  const newGroup = await res.json()
  return newGroup
})

const editGroup = createAsyncThunk("api/editGroup", async ({ id, group }) => {
  const res = await fetch(`/api/groups/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group),
  })
  const editedGroup = await res.json()
  return editedGroup
})

const addColumn = createAsyncThunk("api/addColumn", async (data) => {
  const res = await fetch("/api/columns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
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
  return task
})

const dragTask = createAsyncThunk("api/dragTask", async (data) => {
  await fetch(`/api/columns`, {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return data
})

export { fetchTasks, addGroup, editGroup, addColumn, addTask, dragTask }
/*
  createAsyncThunk("api/fetchTasks", async () => {
   const res = await fetch("/api/groups")
   const taskGroups = await res.json()
   return taskGroups
  })
*/
