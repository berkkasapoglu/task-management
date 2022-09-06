import styles from "./TaskView.module.scss"
import Button from "../../Button/Button"
import Subtask from "@/components/Task/Subtask/Subtask"
import { useDispatch } from "react-redux"
import { deleteTask } from "@/store/task/taskActions"
import { openModal } from "@/store/modal/modalSlice"
import { closeModal } from "@/store/modal/modalSlice"
import { columnSelectors } from "@/store/task/taskSlice"
import { useSelector } from "react-redux"

function TaskView({ task }) {
  const currentColumn = useSelector((state) =>
    columnSelectors.selectById(state, task?.columnId)
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
        taskId: task.id,
      })
    )
  }

  return (
    task && (
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
        <h4 className={styles.subtitle}>Subtasks</h4>
        <ul className={styles.subtaskList}>
          {task.subtasks.map((subtask) => (
            <Subtask subtask={subtask} key={subtask.id} />
          ))}
        </ul>
        <div className={styles.footer}>
          <Button type="danger" onClick={handleDeleteTask}>
            Delete
          </Button>
          <Button type="info" onClick={handleEditTask}>
            Edit
          </Button>
        </div>
      </>
    )
  )
}
export default TaskView
