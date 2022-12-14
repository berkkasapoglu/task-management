import { prisma } from "@/lib/prisma"
import generateRandomColor from "@/utils/generateRandomColor"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  try {
    const { groupId, groupName, columnName } = req.body
    if (req.method === "POST") {
      if (!groupId) {
        const session = await getSession({ req })
        if (session) {
          const user = await prisma.user.findUnique({
            where: {
              email: session.user.email,
            },
          })
          const newGroup = await prisma.group.create({
            data: {
              name: groupName,
              user: {
                connect: { id: user.id },
              },
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
          res.status(401).json({ message: "You must be logged in." })
        }
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
      const updatedColumns = await Promise.all(
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
                create: tasks.map((task) => ({
                  ...task,
                  subtasks: {
                    create: task.subtasks.map((subtask) => ({
                      title: subtask.title,
                    })),
                  },
                })),
              },
            },
            include: {
              tasks: {
                include: {
                  subtasks: true,
                },
              },
            },
          })
        })
      )
      res.status(200).json(updatedColumns)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}
