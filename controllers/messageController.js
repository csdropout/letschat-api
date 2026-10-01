import { prisma } from "../lib/prisma.js";

export async function getMessageList(req, res) {
  const { id } = req.user;
  const messages = await prisma.message.findMany({
    include: {
      sender: {
        select: { id: true, username: true },
      },
      receiver: {
        select: { id: true, username: true },
      },
    },
    where: {
      OR: [{ senderId: id }, { receiverId: id }],
    },
    orderBy: { createdAt: "desc" },
  });

  const conversations = new Map();
  for (const message of messages) {
    const otherUser =
      message.senderId === id ? message.receiver : message.sender;

    if (!conversations.has(otherUser.id)) {
      conversations.set(otherUser.id, {
        user: otherUser,
        lastMessage: message.text,
      });
    }
  }

  const result = [...conversations.values()];

  return res.json(result);
}

export async function getConversation(req, res) {
  const { id } = req.user;
  const { username } = req.params;

  const otherUser = await prisma.user.findUnique({
    where: { username },
  });

  const messages = await prisma.message.findMany({
    include: {
      sender: {
        select: { username: true },
      },
      receiver: {
        select: { username: true },
      },
    },
    where: {
      OR: [
        { senderId: id, receiverId: otherUser.id },
        { senderId: otherUser.id, receiverId: id },
      ],
    },
    orderBy: { createdAt: "asc" },
  });

  return res.json(messages);
}

export async function postMessage(req, res) {
  const { id } = req.user;
  const { username } = req.params;
  const { text } = req.body;

  const receiver = await prisma.user.findUnique({
    select: { id: true },
    where: { username },
  });

  if (!receiver) {
    return res.status(404).json({ error: "User does not exist" });
  }

  const message = await prisma.message.create({
    data: { text, senderId: id, receiverId: receiver.id },
  });

  return res.json(message);
}
