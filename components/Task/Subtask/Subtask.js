import styles from "./Subtask.module.scss"
import { editSubtask } from "@/store/task/taskActions"
import { useDispatch } from "react-redux"

function Subtask({ subtask }) {
  const dispatch = useDispatch()

  const handleEditSubtask = () => {
    const subtaskCopy = { ...subtask }
    subtaskCopy.isDone = !subtaskCopy.isDone
    dispatch(editSubtask(subtaskCopy))
  }

  return (
    <li className={styles.subtask} onClick={handleEditSubtask}>
      <div
        className={`${styles.checkbox} ${subtask.isDone ? styles.checked : ""}`}
      />
      <div>{subtask.title}</div>
    </li>
  )
}
export default Subtask
