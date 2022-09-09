import styles from "./TaskItem.module.scss"
import { FcLowPriority, FcMediumPriority, FcHighPriority } from "react-icons/fc"
import { openModal } from "@/store/modal/modalSlice"
import { useDispatch } from "react-redux"
import { Draggable } from "react-beautiful-dnd"

const PRIORITY_ICONS = {
  Low: <FcLowPriority size={25} />,
  Medium: <FcMediumPriority size={25} />,
  High: <FcHighPriority size={25} />,
}

function TaskItem({ task, index }) {
  const dispatch = useDispatch()
  const completedTaskCount = task.subtasks.reduce(
    (prev, curr) => (curr.isDone ? prev + 1 : prev),
    0
  )

  const handleOpenTaskView = () => {
    dispatch(
      openModal({
        type: "taskView",
        taskId: task.id,
      })
    )
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <li
          className={styles.card}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={handleOpenTaskView}
        >
          <div className={styles.head} custom={index}>
            <h3 className={styles.title}>{task.title}</h3>
            {PRIORITY_ICONS[task.priority]}
          </div>
          <p>{task.description}</p>
          <p className={styles.subtaskStatus}>
            Subtasks: {completedTaskCount}/{task.subtasks.length}
          </p>
        </li>
      )}
    </Draggable>
  )
}
export default TaskItem
