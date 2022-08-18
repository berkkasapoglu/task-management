import styles from "./Modal.module.scss"
import GroupModal from "./TaskModals/GroupModal"
import ColumnModal from "./TaskModals/ColumnModal"
import TaskModal from "./TaskModals/TaskModal"
import Auth from "./AuthModals/Auth"
import useClickOutside from "@/hooks/useClickOutside"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "@/store/modal/modalSlice"
import Backdrop from "../Backdrop/Backdrop"

const modalLookupTable = (props) => ({
  group: <GroupModal {...props} />,
  column: <ColumnModal {...props} />,
  task: <TaskModal {...props} />,
  auth: <Auth {...props} />,
})

function Modal({ selectedGroup, setSelectedGroup }) {
  const dispatch = useDispatch()
  const modalType = useSelector((state) => state.modal.type)
  const modalMode = useSelector((state) => state.modal.mode)
  const modalRef = useClickOutside(() => {
    dispatch(closeModal())
  })
  const InnerModal = (props) => modalLookupTable(props)[props.type]
  return (
    <div>
      <Backdrop />
      <div className={styles.modal}>
        <div className={styles.wrapper} ref={modalRef}>
          <InnerModal type={modalType} mode={modalMode} />
        </div>
      </div>
    </div>
  )
}
export default Modal
