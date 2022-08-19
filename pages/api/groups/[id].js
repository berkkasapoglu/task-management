import { prisma } from "@/lib/prisma"

export default async function handler(req, res) {
  const { id } = req.query
  try {
    if (req.method === "GET") {
      const group = await prisma.group.findUnique({
        data: {
          id: id,
        },
      })

      res.status(200).json(group)
    }
    if (req.method === "DELETE") {
      await prisma.group.delete({
        where: {
          id: id,
        },
      })
      res.status(200).json({ message: "Deleted Succesfully." })
    }
    if (req.method === "PUT") {
      const { name, columns } = req.body
      await prisma.column.deleteMany({
        where: {
          NOT: {
            id: {
              in: columns.map((column) => column.id),
            },
          },
        },
      })
      
      await Promise.all(
        columns.map(async (column) => {
          const { tasks, ...rest } = column
          await prisma.column.update({
            where: {
              id: column.id,
            },
            data: {
              ...rest,
            },
          })
        })
      )

      const updatedGroup = await prisma.group.update({
        where: {
          id: id,
        },
        data: {
          name: name,
        },
        include: {
          columns: {
            orderBy: {
              id: "asc",
            },
            include: {
              tasks: true,
            },
          },
        },
      })

      res.status(200).json(updatedGroup)
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}
