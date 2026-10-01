import { Router } from "express";
import * as userController from "../controllers/userController.js";
const userRouter = Router();

userRouter.get("/:username", userController.getUser);
userRouter.post("/", userController.searchUsers);

export default userRouter;
