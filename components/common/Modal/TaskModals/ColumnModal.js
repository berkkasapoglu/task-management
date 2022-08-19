import styles from "../Modal.module.scss"
import Button from "../../Button/Button"
import { useState } from "react"
import { addColumn } from "@/store/task/taskActions"
import { closeModal } from "@/store/modal/modalSlice"
import { useDispatch, useSelector } from "react-redux"
import Input from "../../Form/Input/Input"

function ColumnModal() {
  const [formData, setFormData] = useState({
    groupName: "",
    columnName: "",
  })

  const dispatch = useDispatch()
  const selectedGroup = useSelector((state) => state.tasks.selectedGroup)

  const handleAddColumn = async (e) => {
    e.preventDefault()
    if (selectedGroup) {
      formData["groupId"] = selectedGroup.id
    }
    dispatch(addColumn(formData))
    dispatch(closeModal())
  }

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleAddColumn}>
      <div className={styles.header}>
        <h2 className={styles.title}>Add New Column</h2>
      </div>
      <div className={styles.body}>
        {!selectedGroup && (
          <Input
            label="Group Name"
            name="groupName"
            id="group"
            onChange={onChange}
            value={formData.groupName}
          />
        )}
        <Input
          label="Column Name"
          name="columnName"
          id="column"
          onChange={onChange}
          value={formData.columnName}
        />
      </div>
      <div className={styles.footer}>
        <Button>Submit</Button>
      </div>
    </form>
  )
}
export default ColumnModal
