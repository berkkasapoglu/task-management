import styles from "./Task.module.scss"
import { dragTask } from "../../store/task/taskActions"
import TaskList from "./TaskList/TaskList"
import { useSelector, useDispatch } from "react-redux"
import { DragDropContext } from "react-beautiful-dnd"

function Task() {
  const selectedGroup = useSelector((state) => state.tasks.selectedGroup)
  const taskGroup = useSelector((state) =>
    state.tasks.taskGroups.find((group) => group.id === selectedGroup?.id)
  )
  const dispatch = useDispatch()

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const { droppableId: draggedColumnId, index: draggedTaskIndex } =
      result.source
    const { droppableId: droppedColumnId, index: droppedTaskIndex } =
      result.destination

    const columns = JSON.parse(JSON.stringify(taskGroup.columns))
    const draggedColumn = columns.find(
      (column) => column.id === draggedColumnId
    )

    const draggedTask = draggedColumn.tasks.splice(draggedTaskIndex, 1)[0]
    const droppedColumn = columns.find(
      (column) => column.id === droppedColumnId
    )
    droppedColumn.tasks.splice(droppedTaskIndex, 0, draggedTask)
    dispatch(dragTask(columns))
  }

  return (
    <main className={styles.wrapper}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <TaskList taskGroup={taskGroup} selectedGroup={selectedGroup} />
      </DragDropContext>
    </main>
  )
}

export default Task
