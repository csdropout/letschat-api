import { Router } from "express";
import * as authController from "../controllers/authController.js";
import passport from "passport";
const authRouter = Router();

authRouter.post(
  "/login",
  passport.authenticate("local"),
  authController.postLogin,
);
authRouter.post("/sign-up", authController.postSignUp);
authRouter.post("/logout", authController.postLogout);

export default authRouter;
