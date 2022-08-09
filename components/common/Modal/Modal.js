import styles from "./Modal.module.scss"
import CreateGroupModal from "./TaskModals/CreateGroupModal"
import AddColumnModal from "./TaskModals/AddColumnModal"
import AddTaskModal from "./TaskModals/AddTaskModal"
import Auth from "./AuthModals/Auth"
import MODAL_TYPES from "./modalTypes"
import useClickOutside from "../../../hooks/useClickOutside"
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../../../store/slices/modalSlice"
import Backdrop from "../Backdrop/Backdrop"

function Modal({ selectedGroup, setSelectedGroup }) {
  const dispatch = useDispatch()
  const modalType = useSelector((state) => state.modal.type)
  const modalRef = useClickOutside(() => {
    dispatch(closeModal())
  })

  return (
    <div>
      <Backdrop />
      <div className={styles.modal}>
        <div className={styles.wrapper} ref={modalRef}>
          {modalType === MODAL_TYPES.addGroup && (
            <CreateGroupModal setSelectedGroup={setSelectedGroup} />
          )}
          {modalType === MODAL_TYPES.addColumn && (
            <AddColumnModal selectedGroup={selectedGroup} />
          )}
          {modalType === MODAL_TYPES.addTask && (
            <AddTaskModal selectedGroup={selectedGroup} />
          )}
          {(MODAL_TYPES.signIn === modalType ||
            MODAL_TYPES.signUp === modalType) && <Auth type={modalType} />}
        </div>
      </div>
    </div>
  )
}
export default Modal
