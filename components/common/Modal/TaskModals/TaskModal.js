import styles from "../Modal.module.scss"
import Button from "../../Button/Button"
import { addTask } from "@/store/task/taskActions"
import { useState } from "react"
import { closeModal } from "@/store/modal/modalSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentGroup } from "@/store/task/taskSlice"
import Input from "../../Form/Input/Input"
import Select from "../../Form/Select/Select"
import { TASK_PRIORITY } from "constants"

function TaskModal() {
  const columns = useSelector(selectCurrentGroup).columns

  const [formData, setFormData] = useState({
    columnName: columns[0].name || "",
    task: {
      title: "",
      description: "",
      priority: TASK_PRIORITY[0],
    },
  })

  const {
    columnName,
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const columnId = columns.find((column) => column.name === columnName).id
    dispatch(
      addTask({
        columnId: columnId,
        task: formData.task,
      })
    )
    dispatch(closeModal())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2 className={styles.title}>Add New Column</h2>
      </div>
      <div className={styles.body}>
        <Select
          label="Column Name"
          name="columnName"
          onChange={onChange}
          value={columnName}
          options={columns.map((column) => column.name)}
        />
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
      </div>
      <div className={styles.footer}>
        <Button>Submit</Button>
      </div>
    </form>
  )
}
export default TaskModal
