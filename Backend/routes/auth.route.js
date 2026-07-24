import express from "express";

import{
  ChangeUserRole,
  deleteUser,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

import {roleCheckMiddleware} from "../middleware/roleCheckmiddleware.js";

const authRouter = express.Router();



authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/change-user-role",
authMiddleware,
roleCheckMiddleware,
ChangeUserRole
);
authRouter.delete("/delete", authMiddleware,roleCheckMiddleware, deleteUser);

export default authRouter;