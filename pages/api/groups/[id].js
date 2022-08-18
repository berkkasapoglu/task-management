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
    if (req.method === "PUT") {
      const { name } = req.body
      const updatedGroup = await prisma.group.update({
        where: {
          id: id,
        },
        data: {
          name: name,
        },
      })
      res.status(200).json(updatedGroup)
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}
