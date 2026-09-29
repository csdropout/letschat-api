import { Router } from "express";
import * as authController from "../controllers/authController.js";
const authRouter = Router();

authRouter.post("/login", authController.postLogin);
authRouter.post("/sign-up", authController.postSignUp);
authRouter.post("/logout", authController.postLogout);

export default authRouter;
