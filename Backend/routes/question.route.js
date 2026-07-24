import express from "express";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  bulkUploadQuestions,
}from "../controllers/question.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleCheckMiddleware } from "../middleware/roleCheckmiddleware.js";

const questionRouter = express.Router();

// Apply auth and admin check only to /questions routes
questionRouter.use("/questions", authMiddleware, roleCheckMiddleware);

//creating questions
questionRouter.post("/questions", createQuestion);

//updating questions
questionRouter.put("/questions/:id", updateQuestion);
//deleting questions
questionRouter.delete("/questions/:id", deleteQuestion);

// Bulk upload questions
questionRouter.post("/questions/bulk/:quizId", bulkUploadQuestions);

export default questionRouter;
