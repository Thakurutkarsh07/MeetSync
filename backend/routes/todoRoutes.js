import express from "express";
import { extractTodosAndSummary, getAllTodos, deleteAllTodos, deleteTaskById  } from "../controllers/todoController.js";

const router = express.Router();

router.post("/extract-todos", extractTodosAndSummary);
router.get("/get-todos", getAllTodos);
router.delete("/delete-todos", deleteAllTodos); // Delete all todos
router.delete("/delete/:summaryId/tasks/:taskId", deleteTaskById);

export default router;
