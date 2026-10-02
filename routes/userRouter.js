import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const userRouter = Router();
userRouter.use(isAuthenticated);

userRouter.get("/:username", userController.getUser);
userRouter.get("/", userController.searchUsers);

export default userRouter;
