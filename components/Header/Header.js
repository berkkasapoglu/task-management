import styles from "./Header.module.scss"
import Button from "../common/Button/Button"
import { BsThreeDotsVertical } from "react-icons/bs"
import Dropdown from "../common/Dropdown/Dropdown"
import DropdownItem from "../common/Dropdown/DropdownItem"
import { groupSelectors } from "@/store/task/taskSlice"
import { selectCurrentGroup } from "@/store/task/taskSlice"
import { useSelector } from "react-redux"
import { openModal } from "@/store/modal/modalSlice"
import { deleteGroup } from "@/store/task/taskActions"
import { useDispatch } from "react-redux"
import { useState } from "react"

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const currentGroup = useSelector(selectCurrentGroup)
  const isColumnExist = currentGroup && currentGroup.columns.length

  const dispatch = useDispatch()
  const handleOpenTaskModal = () => {
    dispatch(
      openModal({
        type: "task",
        mode: "add",
      })
    )
  }

  const handleOpenGroupDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleEditGroup = () => {
    dispatch(
      openModal({
        type: "group",
        mode: "edit",
      })
    )
  }

  const handleDeleteGroup = () => {
    dispatch(deleteGroup(currentGroup.id))
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Tasks</h1>
      <div className={styles.rightSection}>
        <div className={!isColumnExist ? styles.disabled : ""}>
          <Button onClick={handleOpenTaskModal}>Add New Task</Button>
        </div>
        <div
          className={`${styles.threeDots} ${
            !currentGroup ? styles.disabled : ""
          }`}
        >
          <BsThreeDotsVertical size={25} onClick={handleOpenGroupDropdown} />
          {isDropdownOpen && (
            <Dropdown setIsDropdownOpen={setIsDropdownOpen}>
              <DropdownItem onClick={handleEditGroup}>Edit Group</DropdownItem>
              <DropdownItem color="danger" onClick={handleDeleteGroup}>
                Delete Group
              </DropdownItem>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  )
}
export default Header
