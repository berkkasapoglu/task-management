import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {
  try {
    const { groupId, name } = req.body
    if (req.method === "POST") {
      const newColumn = await prisma.column.create({
        data: {
          name: name,
          group: {
            connect: { id: groupId },
          },
        },
      })
      res.status(200).json(newColumn)
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}
