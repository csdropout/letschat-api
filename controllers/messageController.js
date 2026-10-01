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
export async function getConversation(req, res) {}
export async function postMessage(req, res) {}
