import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import passport from "passport";
const authRouter = Router();

authRouter.post(
  "/login",
  passport.authenticate("local"),
  authController.postLogin,
);
authRouter.post("/sign-up", authController.postSignUp);
authRouter.post("/logout", isAuthenticated, authController.postLogout);

export default authRouter;
