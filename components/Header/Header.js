import styles from "./Header.module.scss"
import Button from "../common/Button/Button"
import { openModal } from "../../store/slices/modalSlice"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"

function Header() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })
  const dispatch = useDispatch()
  const { selectedGroup } = useSelector((state) => state.tasks.currentGroup)

  const handleOpenTaskModal = () => {
    dispatch(openModal({
      title: "Add New task",
      type: "addTask"
    }))
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Tasks</h1>
      <Button onClick={handleOpenTaskModal}>Add New Task</Button>
    </header>
  )
}
export default Header
