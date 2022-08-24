import styles from "./Task.module.scss"
import { dragTask } from "@/store/task/taskActions"
import { selectCurrentGroup } from "@/store/task/taskSlice"
import TaskList from "./TaskList/TaskList"
import { useSelector, useDispatch } from "react-redux"
import { DragDropContext } from "react-beautiful-dnd"
import { columnSelectors, taskSelectors } from "@/store/task/taskSlice"

function Task() {
  const selectedGroup = useSelector(selectCurrentGroup)
  const allColumns = useSelector(columnSelectors.selectAll)
  const allTasks = useSelector(taskSelectors.selectEntities)
  const dispatch = useDispatch()

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const { droppableId: draggedColumnId, index: draggedTaskIndex } =
      result.source
    const { droppableId: droppedColumnId, index: droppedTaskIndex } =
      result.destination

    const columns = JSON.parse(
      JSON.stringify(
        allColumns.filter(
          (column) =>
            column.id === draggedColumnId || column.id === droppedColumnId
        )
      )
    )
    const draggedColumn = columns.find(
      (column) => column.id === draggedColumnId
    )
    const draggedTask = draggedColumn.tasks.splice(draggedTaskIndex, 1)[0]
    const droppedColumn = columns.find(
      (column) => column.id === droppedColumnId
    )
    droppedColumn.tasks.splice(droppedTaskIndex, 0, draggedTask)
    columns.forEach((column) => {
      column.tasks = column.tasks.map((taskId) => {
        const populatedTask = { ...allTasks[taskId] }
        populatedTask.columnId = column.id
        return populatedTask
      })
    })
    dispatch(dragTask(columns))
  }

  return (
    <main className={styles.wrapper}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <TaskList selectedGroup={selectedGroup} />
      </DragDropContext>
    </main>
  )
}

export default Task
