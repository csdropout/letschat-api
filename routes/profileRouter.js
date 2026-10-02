import { Router } from "express";
import * as profileController from "../controllers/profileController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const profileRouter = Router();
profileRouter.use(isAuthenticated);

profileRouter.get("/", profileController.getProfile);
profileRouter.patch("/", profileController.updateProfile);

export default profileRouter;
