import express from "express";
import { generateQuizController } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/generate", generateQuizController);

export default router;
