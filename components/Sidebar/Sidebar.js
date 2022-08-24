import styles from "./Sidebar.module.scss"
import Image from "next/dist/client/image"
import Button from "../common/Button/Button"
import { groupSelectors } from "@/store/task/taskSlice"
import { openModal } from "@/store/modal/modalSlice"
import { selectGroup } from "@/store/task/taskSlice"
import { useDispatch, useSelector } from "react-redux"
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"

function Sidebar() {
  const dispatch = useDispatch()
  const selectedGroup = useSelector((state) => state.tasks.selectedGroup)
  const groups = useSelector((state) => state.tasks.groups)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (!selectedGroup && groups.ids.length) {
      handleSelectGroup(groups.entities[groups.ids[0]])
    }
  }, [groups])

  const handleSelectGroup = (group) => {
    dispatch(selectGroup({ id: group.id }))
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
            {Object.values(groups.entities).map((group, idx) =>
              selectedGroup?.id === group.id ||
              (!selectedGroup && idx === 0) ? (
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
