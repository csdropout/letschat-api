import { Router } from "express";
import * as messageController from "../controllers/messageController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const messageRouter = Router();
messageRouter.use(isAuthenticated);

messageRouter.get("/", messageController.getMessageList);
messageRouter.get("/:username", messageController.getConversation);
messageRouter.post("/:username", messageController.postMessage);

export default messageRouter;
