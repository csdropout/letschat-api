import { Router } from "express";
import * as profileController from "../controllers/profileController.js";
const profileRouter = Router();

profileRouter.get("/", profileController.getProfile);
profileRouter.patch("/", profileController.updateProfile);

export default profileRouter;
