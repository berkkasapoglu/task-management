import { prisma } from "@/lib/prisma"
import generateRandomColor from "@/utils/generateRandomColor"

export default async function handler(req, res) {
  try {
    const { groupId, groupName, columnName } = req.body
    if (req.method === "POST") {
      if (!groupId) {
        const newGroup = await prisma.group.create({
          data: {
            name: groupName,
            columns: {
              create: [{ name: columnName, color: generateRandomColor() }],
            },
          },
          include: {
            columns: {
              include: {
                tasks: true,
              },
            },
          },
        })
        res.status(200).json(newGroup)
      } else {
        const newColumn = await prisma.column.create({
          data: {
            name: columnName,
            color: generateRandomColor(),
            group: {
              connect: { id: groupId },
            },
          },
          include: {
            tasks: true,
          },
        })
        res.status(200).json(newColumn)
      }
    }
    if (req.method === "PUT") {
      const columns = JSON.parse(req.body)
      await Promise.all(
        columns.map(async (column) => {
          const tasks = column.tasks.map((task) => {
            const { id, columnId, ...fields } = task
            return fields
          })
          return await prisma.column.update({
            where: {
              id: column.id,
            },
            data: {
              tasks: {
                deleteMany: {},
                create: tasks,
              },
            },
          })
        })
      )
      res.status(200).json({ message: "Dragged" })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}
