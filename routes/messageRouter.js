import { Router } from "express";
import * as messageController from "../controllers/messageController.js";
const messageRouter = Router();

messageRouter.get("/", messageController.getMessageList);
messageRouter.get("/:username", messageController.getConversation);
messageRouter.post("/:username", messageController.postMessage);

export default messageRouter;
