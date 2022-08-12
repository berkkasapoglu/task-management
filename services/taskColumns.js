export const addColumn = async (data) => {
  const res = await fetch("/api/columns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const taskColumns = await res.json()
  return taskColumns
}
