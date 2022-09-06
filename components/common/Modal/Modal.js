import styles from "./Modal.module.scss"
import GroupModal from "./TaskModals/GroupModal"
import ColumnModal from "./TaskModals/ColumnModal"
import TaskModal from "./TaskModals/TaskModal"
import TaskView from "./TaskView/TaskView"
import Auth from "./AuthModals/Auth"
import useClickOutside from "@/hooks/useClickOutside"
import { useDispatch, useSelector } from "react-redux"
import { taskSelectors } from "@/store/task/taskSlice"
import { closeModal } from "@/store/modal/modalSlice"
import Backdrop from "../Backdrop/Backdrop"
import variants from "@/utils/variants"
import { motion } from "framer-motion"
import { MdClose } from "react-icons/md"

const modalLookupTable = (props) => ({
  group: <GroupModal {...props} />,
  column: <ColumnModal {...props} />,
  task: <TaskModal {...props} />,
  taskView: <TaskView {...props} />,
  auth: <Auth {...props} />,
})

function Modal() {
  const dispatch = useDispatch()
  const modalType = useSelector((state) => state.modal.type)
  const modalMode = useSelector((state) => state.modal.mode)
  const task = useSelector((state) =>
    taskSelectors.selectById(state, state.modal.taskId)
  )

  const handleModalClose = () => {
    dispatch(closeModal())
  }

  const modalRef = useClickOutside(handleModalClose)
  const InnerModal = (props) => modalLookupTable(props)[props.type]
  return (
    <>
      <Backdrop />
      <motion.div
        variants={variants.modal}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.modal}
      >
        <div className={styles.wrapper} ref={modalRef}>
          <InnerModal type={modalType} mode={modalMode} task={task} />
          <MdClose
            className={styles.closeIcon}
            size={30}
            onClick={handleModalClose}
          />
        </div>
      </motion.div>
    </>
  )
}
export default Modal
