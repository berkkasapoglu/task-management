import { prisma } from "@/lib/prisma"

export default async function handler(req, res) {
  try {
    const { columnId, task } = req.body
    if (req.method === "POST") {
      const newTask = await prisma.task.create({
        data: {
          ...task,
          column: {
            connect: { id: columnId },
          },
        },
      })
      res.status(200).json(newTask)
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}
