export const getGroups = async () => {
  const res = await fetch("/api/groups")
  const taskGroups = await res.json()
  return taskGroups
}

export const addGroup = async (data) => {
  const res = await fetch("/api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  const newGroup = await res.json()
  return newGroup
}
