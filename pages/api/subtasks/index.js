import { prisma } from "@/lib/prisma"

export default async function handler(req, res) {
  try {
    if (req.method === "PUT") {
      const subtask = JSON.parse(req.body)
      await prisma.subTask.update({
        where: {
          id: subtask.id,
        },
        data: subtask,
      })
      res.status(200).json({ message: "Subtask Updated Successfully." })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}
