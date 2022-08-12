import styles from "../Modal.module.scss"
import Button from "../../Button/Button"
import { useState } from "react"
import { addGroup } from "../../../../store/slices/taskSlice"
import { addGroup as addGroupToDB } from "../../../../services/taskGroups"
import { closeModal } from "../../../../store/slices/modalSlice"
import { useDispatch } from "react-redux"
import Input from "../../Form/Input/Input"

function CreateGroupModal() {
  const [groupName, setGroupName] = useState("")

  const dispatch = useDispatch()
  const handleAddGroup = async (e) => {
    e.preventDefault()
    const newGroup = await addGroupToDB({
      name: groupName,
    })
    dispatch(addGroup({ group: newGroup }))
    dispatch(closeModal())
  }

  const onChange = (e) => {
    setGroupName(e.target.value)
  }

  return (
    <form onSubmit={handleAddGroup}>
      <h2 className={styles.title}>Create New Group</h2>
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
        <Button>Submit</Button>
      </div>
    </form>
  )
}
export default CreateGroupModal
