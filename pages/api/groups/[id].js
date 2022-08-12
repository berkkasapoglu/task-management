import { prisma } from "../../lib/prisma"

export default async function handler(req, res) {
  const { id } = req.params
  try {
    if (req.method === "GET") {
      const group = await prisma.group.findUnique({
        data: {
          id: id,
        },
      })
      res.status(200).json(group)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}
