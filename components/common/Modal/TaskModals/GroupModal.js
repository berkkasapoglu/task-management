import styles from "../Modal.module.scss"
import Button from "../../Button/Button"
import { useState } from "react"
import { addGroup, editGroup } from "@/store/task/taskActions"
import { closeModal } from "@/store/modal/modalSlice"
import { useDispatch, useSelector } from "react-redux"
import Input from "../../Form/Input/Input"
import { useRef } from "react"

function GroupModal({ mode }) {
  const selectedGroup = useSelector((state) => state.tasks.selectedGroup)
  const isEditMode = useRef(mode === "edit").current

  const [groupName, setGroupName] = useState(
    isEditMode ? selectedGroup.name : ""
  )

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const groupData = { name: groupName }
    isEditMode
      ? dispatch(editGroup({ id: selectedGroup.id, group: groupData }))
      : dispatch(addGroup(groupData))
    dispatch(closeModal())
  }

  const onChange = (e) => {
    setGroupName(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        {isEditMode ? `Edit Group - ${selectedGroup.name}` : "Create New Group"}
      </h2>
      <div className={styles.body}>
        <div className={styles.inputWrapper}>
          <Input
            label="Group Name"
            name="group"
            value={groupName}
            onChange={onChange}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <Button>{isEditMode ? "Save Changes" : "Add Group"}</Button>
      </div>
    </form>
  )
}
export default GroupModal
