import styles from "./Sidebar.module.scss"
import Image from "next/dist/client/image"
import { openModal } from "../../store/slices/modalSlice"
import { selectGroup } from "../../store/slices/taskSlice"
import { useDispatch, useSelector } from "react-redux"

function Sidebar() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks)
  const groups = Object.keys(tasks.taskGroups)

  const handleSelectGroup = (group) => {
    dispatch(
      selectGroup({
        group,
      })
    )
  }

  const handleAddGroup = (e) => {
    e.preventDefault()
    dispatch(
      openModal({
        title: "Create New Group",
        type: "addGroup",
      })
    )
  }

  return (
    <nav className={styles.sidebar}>
      <Image
        width={80}
        height={80}
        src="/assets/logo.svg"
        alt="Website logo"
        className={styles.logo}
        priority={true}
      />
      <div className={styles.body}>
        <h3 className={styles.title}>Task Groups</h3>
        <ul className={styles.list}>
          {groups.map((group, idx) =>
            tasks.currentGroup === group ? (
              <a key={idx} onClick={() => handleSelectGroup(group)}>
                <li className={`${styles.item} ${styles.active}`}>{group}</li>
              </a>
            ) : (
              <a key={idx} onClick={() => handleSelectGroup(group)}>
                <li className={styles.item}>{group}</li>
              </a>
            )
          )}
          <a className={styles.link} onClick={handleAddGroup}>
            Create New Group
          </a>
        </ul>
      </div>
    </nav>
  )
}
export default Sidebar
