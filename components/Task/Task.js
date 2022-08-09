import styles from "./Task.module.scss"
import { updateGroup } from "../../store/slices/taskSlice"
import TaskList from "./TaskList/TaskList"
import { useSelector, useDispatch } from "react-redux"
import { DragDropContext } from "react-beautiful-dnd"

function Task() {
  const { tasks, selectedGroup } = useSelector((state) => {
    return {
      tasks: state.tasks.taskGroups,
      selectedGroup: state.tasks.currentGroup,
    }
  })
  const dispatch = useDispatch()

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const { droppableId: dragColumnIndex, index: dragTaskIndex } = result.source
    const { droppableId: dropColumnIndex, index: dropTaskIndex } =
      result.destination
    dragColumnIndex = parseInt(dragColumnIndex)
    dropColumnIndex = parseInt(dropColumnIndex)

    const columns = JSON.parse(JSON.stringify(tasks[selectedGroup]))
    const draggedTask = columns[dragColumnIndex].tasks.splice(
      dragTaskIndex,
      1
    )[0]
    columns[dropColumnIndex].tasks.splice(dropTaskIndex, 0, draggedTask)
    dispatch(updateGroup(columns))
  }

  return (
    <main className={styles.wrapper}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <TaskList tasks={tasks} selectedGroup={selectedGroup} />
      </DragDropContext>
    </main>
  )
}

export default Task
