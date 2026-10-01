import { Router } from "express";
import * as messageController from "../controllers/messageController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const messageRouter = Router();

messageRouter.get("/", isAuthenticated, messageController.getMessageList);
messageRouter.get(
  "/:username",
  isAuthenticated,
  messageController.getConversation,
);
messageRouter.post(
  "/:username",
  isAuthenticated,
  messageController.postMessage,
);

export default messageRouter;
