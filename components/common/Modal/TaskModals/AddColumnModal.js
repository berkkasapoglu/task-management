import styles from "../Modal.module.scss"
import Button from "../../Button/Button"
import { useState } from "react"
import { addColumn } from "../../../../store/slices/taskSlice"
import { closeModal } from "../../../../store/slices/modalSlice"
import { useDispatch, useSelector } from "react-redux"
import Input from "../../Form/Input/Input"

function AddColumnModal() {
  const [formData, setFormData] = useState({
    group: "",
    column: "",
  })

  const dispatch = useDispatch()
  const selectedGroup = useSelector((state) => state.tasks.currentGroup)
  const handleAddColumn = () => {
    dispatch(
      addColumn({
        group: selectedGroup || formData.group,
        column: formData.column,
      })
    )
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
          <div className={styles.inputWrapper}>
            <Input
              label="Group Name"
              name="group"
              id="group"
              onChange={onChange}
              value={formData.group}
            />
          </div>
        )}
        <div className={styles.inputWrapper}>
          <Input
            label="Column Name"
            name="column"
            id="column"
            onChange={onChange}
            value={formData.column}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <Button>Submit</Button>
      </div>
    </form>
  )
}
export default AddColumnModal
