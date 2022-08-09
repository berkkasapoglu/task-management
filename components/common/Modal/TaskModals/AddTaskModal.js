import styles from "../Modal.module.scss"
import Button from "../../Button/Button"
import { useState } from "react"
import { addTask } from "../../../../store/slices/taskSlice"
import { closeModal } from "../../../../store/slices/modalSlice"
import { useDispatch, useSelector } from "react-redux"
import Input from "../../Form/Input/Input"
import Select from "../../Form/Select/Select"

const TASK_PRIORITY = ["Low", "Medium", "High"]

function AddTaskModal() {
  const { columns } = useSelector((state) => ({
    columns: state.tasks.taskGroups[state.tasks.currentGroup],
  }))
  const [formData, setFormData] = useState({
    column: columns[0].name || "",
    task: {
      title: "",
      description: "",
      priority: TASK_PRIORITY[0],
    },
  })

  const {
    column,
    task: { title, description, priority },
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

  const handleAddTask = () => {
    dispatch(addTask(formData))
    dispatch(closeModal())
  }

  return (
    <form onSubmit={handleAddTask}>
      <div className={styles.header}>
        <h2 className={styles.title}>Add New Column</h2>
      </div>
      <div className={styles.body}>
        <div className={styles.inputWrapper}>
          <Select
            label="Column Name"
            name="column"
            onChange={onChange}
            value={column}
            options={columns.map((column) => column.name)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <Input
            label="Title"
            name="task_title"
            id={title}
            onChange={onChange}
            value={title}
          />
        </div>
        <div className={styles.inputWrapper}>
          <Input
            label="Description"
            id={title}
            name="task_description"
            onChange={onChange}
            value={description}
          />
        </div>
        <div className={styles.inputWrapper}>
          <Select
            label="Status"
            name="task_priority"
            onChange={onChange}
            value={priority}
            options={TASK_PRIORITY}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <Button>Submit</Button>
      </div>
    </form>
  )
}
export default AddTaskModal
