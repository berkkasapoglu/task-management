import styles from "./Modal.module.scss"
import GroupModal from "./TaskModals/GroupModal"
import ColumnModal from "./TaskModals/ColumnModal"
import TaskModal from "./TaskModals/TaskModal"
import TaskView from "./TaskModals/TaskView"
import Auth from "./AuthModals/Auth"
import useClickOutside from "@/hooks/useClickOutside"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "@/store/modal/modalSlice"
import Backdrop from "../Backdrop/Backdrop"

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
  const task = useSelector((state) => state.modal.task)

  const modalRef = useClickOutside(() => {
    dispatch(closeModal())
  })
  const InnerModal = (props) => modalLookupTable(props)[props.type]
  return (
    <div>
      <Backdrop />
      <div className={styles.modal}>
        <div className={styles.wrapper} ref={modalRef}>
          <InnerModal type={modalType} mode={modalMode} task={task} />
        </div>
      </div>
    </div>
  )
}
export default Modal
