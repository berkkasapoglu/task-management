import styles from "../Modal.module.scss"
import Button from "../../Button/Button"
import { useRef } from "react"
import { addTask, editTask } from "@/store/task/taskActions"
import { useState } from "react"
import { closeModal } from "@/store/modal/modalSlice"
import { useDispatch, useSelector } from "react-redux"
import { columnSelectors } from "@/store/task/taskSlice"
import { selectColumnsByGroupId } from "@/store/task/taskSlice"
import { FaTrash } from "react-icons/fa"
import Input from "../../Form/Input/Input"
import Select from "../../Form/Select/Select"
import { TASK_PRIORITY } from "constants"

function TaskModal({ mode, task }) {
  const columns = useSelector((state) =>
    selectColumnsByGroupId(state, state.tasks.selectedGroup.id)
  )
  const currentColumn = useSelector((state) =>
    columnSelectors.selectById(state, task?.columnId)
  )

  const isEditMode = useRef(mode === "edit").current

  const [formData, setFormData] = useState({
    columnName: isEditMode ? currentColumn.name : columns[0].name,
    task: isEditMode
      ? task
      : {
          title: "",
          description: "",
          priority: TASK_PRIORITY[0],
          subtasks: [],
        },
  })

  const {
    columnName,
    task: { title, description, priority, subtasks },
  } = formData

  const dispatch = useDispatch()

  const onChange = (e) => {
    const name = e.target.name
    const nameList = name.split("_")
    if (nameList.length > 1) {
      const [key, name] = nameList
      setFormData({
        ...formData,
        [key]: {
          ...formData[key],
          [name]: e.target.value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const columnId = columns.find((column) => column.name === columnName).id
    isEditMode
      ? dispatch(editTask(formData.task))
      : dispatch(
          addTask({
            columnId: columnId,
            task: formData.task,
          })
        )
    dispatch(closeModal())
  }

  const handleSubtaskAdd = (e) => {
    e.preventDefault()
    const newSubtask = { title: "" }
    setFormData({
      ...formData,
      task: {
        ...formData.task,
        subtasks: [...subtasks, newSubtask],
      },
    })
  }

  const handleSubtaskRemove = (e, idx) => {
    e.preventDefault()
    const subtasksCopy = [...subtasks]
    subtasksCopy.splice(idx, 1)
    setFormData({
      ...formData,
      task: {
        ...formData.task,
        subtasks: subtasksCopy,
      },
    })
  }

  const onSubtaskChange = (e, idx) => {
    const subtasksCopy = subtasks.map((subtask) => ({ ...subtask }))
    subtasksCopy[idx].title = e.target.value
    setFormData({
      ...formData,
      task: {
        ...formData.task,
        subtasks: subtasksCopy,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {isEditMode ? `Edit Task - ${task.title}` : "Add New Task"}
        </h2>
      </div>
      <div className={styles.body}>
        {!isEditMode && (
          <Select
            label="Column Name"
            name="columnName"
            onChange={onChange}
            value={columnName}
            options={columns.map((column) => column.name)}
          />
        )}
        <Input
          label="Title"
          name="task_title"
          id={title}
          onChange={onChange}
          value={title}
        />
        <Input
          label="Description"
          id={title}
          name="task_description"
          onChange={onChange}
          value={description}
        />
        <Select
          label="Status"
          name="task_priority"
          onChange={onChange}
          value={priority}
          options={TASK_PRIORITY}
        />
        <p className={styles.subtitle}>Subtasks</p>
        {subtasks.map((subtask, idx) => (
          <div className={styles.cols} key={idx}>
            <Input
              placeholder="Title"
              name="task_subtasks"
              onChange={(e) => onSubtaskChange(e, idx)}
              value={subtask.title}
            />
            <FaTrash
              className={styles.trash}
              onClick={(e) => handleSubtaskRemove(e, idx)}
            />
          </div>
        ))}
        <Button size="full" type="info" onClick={handleSubtaskAdd}>
          Add Subtask
        </Button>
      </div>
      <div className={styles.footer}>
        <Button>Submit</Button>
      </div>
    </form>
  )
}
export default TaskModal
