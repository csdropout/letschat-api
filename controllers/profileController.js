import { prisma } from "../lib/prisma.js";

export async function getProfile(req, res) {
  const user = { ...req.user };
  delete user.hash;
  return res.json(user);
}

export async function updateProfile(req, res) {
  const user = req.user;
  const { username, bio } = req.body;

  if (!username.trim()) {
    return res.status(400).json({ error: "Username is required" });
  }

  const isExistingUser = await prisma.user.findUnique({
    where: {
      username,
      NOT: {
        id: req.user.id,
      },
    },
  });

  if (isExistingUser)
    return res.status(409).json({ error: "Username is in use" });

  const updatedUser = await prisma.user.update({
    data: {
      username,
      bio,
    },
    where: { id: user.id },
  });

  return res.sendStatus(204);
}
