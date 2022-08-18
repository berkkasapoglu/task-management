import styles from "./Header.module.scss"
import Button from "../common/Button/Button"
import { BsThreeDotsVertical } from "react-icons/bs"
import Dropdown from "../common/Dropdown/Dropdown"
import DropdownItem from "../common/Dropdown/DropdownItem"
import { openModal } from "store/modal/modalSlice"
import { useDispatch } from "react-redux"
import { useState } from "react"

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dispatch = useDispatch()
  const handleOpenTaskModal = () => {
    dispatch(
      openModal({
        type: "task",
        mode: "add",
      })
    )
  }

  const handleOpenBoardDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleEditBoard = () => {
    dispatch(
      openModal({
        type: "group",
        mode: "edit",
      })
    )
  }

  const handleDeleteBoard = () => {}

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Tasks</h1>
      <div className={styles.rightSection}>
        <Button onClick={handleOpenTaskModal}>Add New Task</Button>
        <div className={styles.threeDots}>
          <BsThreeDotsVertical size={25} onClick={handleOpenBoardDropdown} />
          {isDropdownOpen && (
            <Dropdown>
              <DropdownItem onClick={handleEditBoard}>Edit Board</DropdownItem>
              <DropdownItem color="danger" onClick={handleDeleteBoard}>
                Delete Board
              </DropdownItem>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  )
}
export default Header
