import { prisma } from "@/lib/prisma"

export default async function handler(req, res) {
  try {
    const { id } = req.query
    if (req.method === "PUT") {
      const { columnId, subtasks, ...task } = req.body
      const updatedTask = await prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          ...task,
          subtasks: {
            deleteMany: {},
            createMany: {
              data: subtasks.map((subtask) => ({ title: subtask.title })),
            },
          },
        },
        include: {
          subtasks: true,
        },
      })

      res.status(200).json(updatedTask)
    }
    if (req.method === "DELETE") {
      await prisma.task.delete({
        where: {
          id: id,
        },
      })
      res.status(200).json({ message: "Task Deleted Successfully." })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}
