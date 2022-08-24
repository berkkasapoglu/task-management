import styles from "./TaskView.module.scss"
import Button from "../../Button/Button"
import { useDispatch } from "react-redux"
import { deleteTask } from "@/store/task/taskActions"
import { openModal } from "@/store/modal/modalSlice"
import { closeModal } from "@/store/modal/modalSlice"
import { columnSelectors } from "@/store/task/taskSlice"
import { useSelector } from "react-redux"

function TaskView({ task }) {
  const currentColumn = useSelector((state) =>
    columnSelectors.selectById(state, task.columnId)
  )

  const dispatch = useDispatch()
  const handleDeleteTask = () => {
    dispatch(deleteTask({ id: task.id, columnId: currentColumn.id }))
    dispatch(closeModal())
  }
  const handleEditTask = () => {
    dispatch(
      openModal({
        type: "task",
        mode: "edit",
        task: task,
      })
    )
  }

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Task - {task.title}</h2>
        <p className={styles.description}>{task.description}</p>
      </div>
      <div className={styles.body}>
        <div>
          Current Priority: <strong>{task.priority}</strong>
        </div>
        <div>
          Current Column: <strong>{currentColumn.name}</strong>
        </div>
      </div>
      <h4>Subtasks</h4>
      <ul>
        {task.subtasks.map((subtask) => (
          <li key={subtask.id}>{subtask.title}</li>
        ))}
      </ul>
      <div className={styles.footer}>
        <Button type="danger" onClick={handleDeleteTask}>
          Delete Task
        </Button>
        <Button type="info" onClick={handleEditTask}>
          Edit Task
        </Button>
      </div>
    </>
  )
}
export default TaskView
