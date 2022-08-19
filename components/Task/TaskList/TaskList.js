import styles from "./TaskList.module.scss"
import { BsPlusLg } from "react-icons/bs"
import { Droppable } from "react-beautiful-dnd"
import TaskItem from "../TaskItem/TaskItem"
import { openModal } from "@/store/modal/modalSlice"
import { useDispatch } from "react-redux"

function TaskList({ taskGroup, selectedGroup }) {
  const dispatch = useDispatch()

  const handleAddColumn = () => {
    dispatch(
      openModal({
        type: "column",
        mode: "add",
      })
    )
  }

  return (
    <div className={styles.columns}>
      {selectedGroup &&
        taskGroup.columns?.map((column, columnIdx) => (
          <div className={styles.addBlock} key={columnIdx}>
            <div className={styles.head}>
              <span
                className={styles.circle}
                style={{ backgroundColor: column.color }}
              ></span>
              <p>{column.name}</p>
            </div>
            <Droppable droppableId={column.id} index={columnIdx}>
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.list}
                >
                  {column.tasks?.map((task, taskIdx) => (
                    <TaskItem task={task} index={taskIdx} key={task.id} />
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        ))}
      <div className={styles.block} onClick={handleAddColumn}>
        <BsPlusLg size={50} className={styles.plusIcon} />
        <h3 className={styles.title}>Add New Column</h3>
      </div>
    </div>
  )
}
export default TaskList
