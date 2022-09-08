import { prisma } from "@/lib/prisma"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })
  try {
    const { name } = req.body
    if (req.method === "GET") {
      if (session) {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        })
        const groups = await prisma.group.findMany({
          where: {
            userId: user.id,
          },
          orderBy: {
            id: "asc",
          },
          include: {
            columns: {
              orderBy: {
                id: "asc",
              },
              include: {
                tasks: {
                  include: {
                    subtasks: true,
                  },
                },
              },
            },
          },
        })
        res.status(200).json(groups)
      } else {
        res.status(401).json({ message: "Unauthorized." })
      }
    }
    if (req.method === "POST") {
      if (session) {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        })
        const group = await prisma.group.create({
          data: {
            name: name,
            user: {
              connect: { id: user.id },
            },
          },
          include: {
            columns: true,
          },
        })
        res.status(200).json(group)
      } else {
        res.status(401).json({ message: "Unauthorized." })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}
