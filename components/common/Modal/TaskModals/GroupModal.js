import styles from "../Modal.module.scss"
import Button from "../../Button/Button"
import { FaTrash } from "react-icons/fa"
import { selectCurrentGroup } from "@/store/task/taskSlice"
import { useState } from "react"
import { addGroup, editGroup } from "@/store/task/taskActions"
import { closeModal } from "@/store/modal/modalSlice"
import { useDispatch, useSelector } from "react-redux"
import Input from "../../Form/Input/Input"
import { useRef } from "react"

function GroupModal({ mode }) {
  const selectedGroup = useSelector(selectCurrentGroup)
  const isEditMode = useRef(mode === "edit").current

  const [formData, setFormData] = useState({
    name: isEditMode ? selectedGroup.name : "",
    columns: selectedGroup.columns,
  })
  const { name, columns } = formData

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    isEditMode
      ? dispatch(editGroup({ id: selectedGroup.id, group: formData }))
      : dispatch(addGroup({ name: formData.name }))
    dispatch(closeModal())
  }

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleColumnChange = (e, idx) => {
    const columnsCopy = columns.map((column) => ({ ...column }))
    const column = columnsCopy[idx]
    column[e.target.name] = e.target.value
    setFormData({
      ...formData,
      columns: columnsCopy,
    })
  }

  const handleColumnDelete = (idx) => {
    const columnsCopy = columns.map((column) => ({ ...column }))
    columnsCopy.splice(idx, 1)
    setFormData({
      ...formData,
      columns: columnsCopy,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        {isEditMode ? `Edit Group - ${selectedGroup.name}` : "Create New Group"}
      </h2>
      <div className={styles.body}>
        <Input
          label="Group Name"
          name="name"
          value={name}
          onChange={onChange}
        />
        {isEditMode && (
          <>
            <p className={styles.subtitle}>Columns</p>
            {columns.map((column, idx) => (
              <div className={styles.cols} key={column.id}>
                <Input
                  name="name"
                  value={column.name}
                  onChange={(e) => handleColumnChange(e, idx)}
                />
                <FaTrash
                  className={styles.trash}
                  onClick={() => handleColumnDelete(idx)}
                />
              </div>
            ))}
          </>
        )}
      </div>
      <div className={styles.footer}>
        <Button>{isEditMode ? "Save Changes" : "Add Group"}</Button>
      </div>
    </form>
  )
}
export default GroupModal
