import { Router } from "express";
import * as userController from "../controllers/userController.js";
const userRouter = Router();

userRouter.get("/:username", userController.getUser);
userRouter.post("/:username", userController.updateUser);
userRouter.post("/", userController.searchUsers);

export default userRouter;
