import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {
  try {
    const { name } = req.body
    if (req.method === "POST") {
      const group = await prisma.group.create({
        data: {
          name: name,
        },
      })
      res.status(200).json(group)
    } else if (req.method === "GET") {
      const groups = await prisma.group.findMany({
        include: {
          columns: true,
        },
      })
      res.status(200).json(groups)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}