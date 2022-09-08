import styles from "./Sidebar.module.scss"
import Image from "next/dist/client/image"
import Button from "../common/Button/Button"
import { openModal } from "@/store/modal/modalSlice"
import { selectGroup } from "@/store/task/taskSlice"
import { useDispatch, useSelector } from "react-redux"
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"
import { BsArrowRightSquare } from "react-icons/bs"
import { motion } from "framer-motion"
import useWindowSize from "@/hooks/useWindowSize"
import useClickOutside from "@/hooks/useClickOutside"
import { useState } from "react"

function Sidebar() {
  const screen = useWindowSize()
  const isMobile = screen.width <= 768
  const sidebarRef = useClickOutside(() => {
    isMobile && setIsSidebarOpen(false)
  })

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    } else {
      setIsSidebarOpen(true)
    }
  }, [screen.width])

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

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

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <motion.nav
        animate={isSidebarOpen ? { x: 0 } : { x: -230 }}
        transition={{ duration: 0.35 }}
        className={styles.sidebar}
        ref={sidebarRef}
      >
        <div>
          <div className={styles.logo}>
            <Image
              width={80}
              height={80}
              src="/assets/logo.svg"
              alt="Website logo"
              priority={true}
            />
          </div>
          <div className={styles.body}>
            <h3 className={styles.title}>Task Groups</h3>
            <ul className={styles.list}>
              {Object.values(groups.entities).map((group, idx) =>
                selectedGroup?.id === group.id ||
                (!selectedGroup && idx === 0) ? (
                  <a key={idx} onClick={() => handleSelectGroup(group)}>
                    <li className={`${styles.item} ${styles.active}`}>
                      <div className={`${styles.topBlock} ${styles.back}`} />
                      <div className={`${styles.topBlock} ${styles.front}`} />
                      {group.name}
                      <div className={`${styles.bottomBlock} ${styles.back}`} />
                      <div
                        className={`${styles.bottomBlock} ${styles.front}`}
                      />
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

        {isMobile && (
          <BsArrowRightSquare
            className={`${styles.toggle} ${
              isSidebarOpen ? styles.leftArrow : ""
            }`}
            onClick={handleToggleSidebar}
          />
        )}
      </motion.nav>
    </>
  )
}
export default Sidebar
