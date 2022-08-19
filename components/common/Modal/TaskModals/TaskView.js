import { selectCurrentGroup } from "@/store/task/taskSlice"
import { useSelector } from "react-redux"
import Select from "../../Form/Select/Select"
import { TASK_PRIORITY } from "constants"

function TaskView({ task }) {
  const currentGroup = useSelector(selectCurrentGroup)
  const { columns } = currentGroup
  return (
    <>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <Select
        label="Current Priority"
        name="task_priority"
        // onChange={onChange}
        // value={priority}
        options={TASK_PRIORITY}
      />
      <Select
        label="Current Column"
        name="columnName"
        // onChange={onChange}
        // value={columnName}
        options={columns.map((column) => column.name)}
      />
    </>
  )
}
export default TaskView
