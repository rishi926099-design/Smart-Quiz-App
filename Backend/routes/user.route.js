import express from "express";
import {
  updateProfile,
  updateAvatar,
  updatePassword,
  getAllUsers,
  updateUserStatus,
} from "../controllers/user.contorller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleCheckMiddleware } from "../middleware/roleCheckmiddleware.js";
//import upload from "../middlewares/upload.middleware.js";

const userRouter = express.Router();

// Apply auth middleware only to /users routes
userRouter.use("/users", authMiddleware);

userRouter.put("/users/profile", updateProfile);
//userRouter.put("/users/avatar", upload.single("avatar"), updateAvatar);
userRouter.put("/users/password", updatePassword);

// Admin-only user management routes
userRouter.get("/users", roleCheckMiddleware, getAllUsers);
userRouter.patch("/users/:userId/status", roleCheckMiddleware, updateUserStatus);

export default userRouter;
