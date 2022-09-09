import { prisma } from "@/lib/prisma"

export default async function handler(req, res) {
  try {
    const { columnId, task } = req.body
    if (req.method === "POST") {
      const newTask = await prisma.task.create({
        data: {
          ...task,
          subtasks: {
            create: task.subtasks.map((subtask) => ({ ...subtask })),
          },
          column: {
            connect: { id: columnId },
          },
        },
        include: {
          subtasks: true,
        },
      })
      res.status(200).json(newTask)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}
