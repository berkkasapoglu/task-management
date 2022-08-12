import Head from "next/head"
import Sidebar from "../components/Sidebar/Sidebar"
import Header from "../components/Header/Header"
import Container from "../components/Container/Container"
import Task from "../components/Task/Task"
import Modal from "../components/common/Modal/Modal"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { replaceTasks } from "../store/slices/taskSlice"
import { getGroups } from "../services/taskGroups"
import { resetServerContext } from "react-beautiful-dnd"

export default function Home() {
  const isModalOpen = useSelector((state) => state.modal.isOpen)
  const dispatch = useDispatch()
  useEffect(() => {
    const getInitialTasks = async () => {
      const taskGroups = await getGroups()
      dispatch(replaceTasks(taskGroups))
    }
    getInitialTasks()
  }, [])

  return (
    <>
      <Head>
        <title>Tasks</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      {isModalOpen && <Modal />}
      <Container>
        <Header />
        <Task />
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  resetServerContext()
  return { props: { data: [] } }
}