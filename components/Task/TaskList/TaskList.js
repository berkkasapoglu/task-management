import styles from "./TaskList.module.scss"
import { motion } from "framer-motion"
import variants from "@/utils/variants"
import { BsPlusLg } from "react-icons/bs"
import { Droppable } from "react-beautiful-dnd"
import { selectColumnsByGroupId } from "@/store/task/taskSlice"
import { taskSelectors } from "@/store/task/taskSlice"
import TaskItem from "../TaskItem/TaskItem"
import { openModal } from "@/store/modal/modalSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

function TaskList({ selectedGroup }) {
  const dispatch = useDispatch()
  const columns = useSelector((state) =>
    selectColumnsByGroupId(state, state.tasks.selectedGroup.id)
  )

  const tasks = useSelector(taskSelectors.selectEntities)

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
        columns.map((column, columnIdx) => (
          <div className={styles.addBlock} key={column.id}>
            <motion.div
              layout
              custom={columnIdx}
              variants={variants.columnHeader}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.head}
            >
              <span
                className={styles.circle}
                style={{ backgroundColor: column.color }}
              ></span>
              <p>{column.name}</p>
            </motion.div>
            <Droppable droppableId={column.id} index={columnIdx}>
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.list}
                >
                  {column.tasks?.map((taskId, taskIdx) => (
                    <TaskItem
                      task={tasks[taskId]}
                      index={taskIdx}
                      key={taskId}
                    />
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
