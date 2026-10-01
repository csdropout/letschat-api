import { prisma } from "../lib/prisma.js";

export async function getUser(req, res) {
  const { username } = req.params;
  const user = await prisma.user.findUnique({
    omit: { hash: true },
    where: { username },
  });
  if (!user) return res.status(404).json({ error: "User does not exist" });
  return res.json(user);
}
export async function updateUser(req, res) {}
export async function searchUsers(req, res) {}
