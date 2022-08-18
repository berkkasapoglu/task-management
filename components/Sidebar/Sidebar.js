import styles from "./Sidebar.module.scss"
import Image from "next/dist/client/image"
import Button from "../common/Button/Button"
import { openModal } from "store/modal/modalSlice"
import { selectGroup } from "store/task/taskSlice"
import { useDispatch, useSelector } from "react-redux"
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"

function Sidebar({ loading }) {
  const dispatch = useDispatch()
  const { taskGroups, selectedGroup } = useSelector((state) => state.tasks)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (!selectedGroup && taskGroups.length) {
      handleSelectGroup(taskGroups[0])
    }
  }, [taskGroups])

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
        type: "group",
        mode: "add",
      })
    )
  }

  const handleAuth = (e) => {
    dispatch(
      openModal({
        type: "signUp",
      })
    )
  }

  return (
    <nav className={styles.sidebar}>
      <div>
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
            {taskGroups.map((group, idx) =>
              selectedGroup.id === group.id || (!selectedGroup && idx === 0) ? (
                <a key={idx} onClick={() => handleSelectGroup(group)}>
                  <li className={`${styles.item} ${styles.active}`}>
                    {group.name}
                  </li>
                </a>
              ) : (
                <a key={idx} onClick={() => handleSelectGroup(group)}>
                  <li className={styles.item}>{group.name}</li>
                </a>
              )
            )}
            <a className={styles.link} onClick={handleAddGroup}>
              Create New Group
            </a>
          </ul>
        </div>
      </div>
      {status === "authenticated" ? (
        <Button onClick={signOut} type="secondary">
          Sign Out
        </Button>
      ) : (
        <Button onClick={signIn} type="secondary">
          Sign In
        </Button>
      )}
    </nav>
  )
}
export default Sidebar
