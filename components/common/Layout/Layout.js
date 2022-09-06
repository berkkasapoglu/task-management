import Sidebar from "@/components/Sidebar/Sidebar"
import Modal from "../Modal/Modal"
import Container from "@/components/Container/Container"
import { AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

function Layout({ children }) {
  const isModalOpen = useSelector((state) => state.modal.isOpen)

  return (
    <>
      <Sidebar />
      <AnimatePresence mode="wait">{isModalOpen && <Modal />}</AnimatePresence>
      <Container>{children}</Container>
    </>
  )
}
export default Layout
