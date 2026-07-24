import express from "express";
const categoryRouter = express.Router();
import {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleCheckMiddleware } from "../middleware/roleCheckmiddleware.js";
//routing

categoryRouter.post(
  "/categories",
  authMiddleware,
  roleCheckMiddleware,
  createCategory
);
categoryRouter.get("/categories/:id", getCategory);
categoryRouter.delete("/categories/:id", deleteCategory);
categoryRouter.put("/categories/:id", updateCategory);
categoryRouter.get("/categories", getCategories);

export default categoryRouter;
