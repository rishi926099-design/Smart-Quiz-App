import express from "express";
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  getQuizQuestions,
  updateQuiz,
  deleteQuiz,
} from "../Controllers/quiz.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleCheckMiddleware } from "../middleware/roleCheckmiddleware.js"; 

const quizRouter = express.Router();

// Apply ayth middleware only to /quizzes route
quizRouter.use("/quizzes", authMiddleware);

//get quizzes
quizRouter.get("/quizzes", getQuizzes);

//get single quiz
quizRouter.get("/quizzes/:id", getQuizById);

//get quiz questions
quizRouter.get("/quizzes/:id/questions", getQuizQuestions);

//Admin-only quiz management routes
quizRouter.post("/quizzes",
  roleCheckMiddleware,
  createQuiz);


quizRouter.put("/quizzes/:id",
  roleCheckMiddleware,
  updateQuiz);

quizRouter.delete("/quizzes/:id",
  roleCheckMiddleware
  ,
  deleteQuiz);

export default quizRouter;