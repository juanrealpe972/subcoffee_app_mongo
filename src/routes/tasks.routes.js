import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getTasks, getTask, createTasks, updateTask, deleteTask } from "../controllers/tasks.controller.js";

const router = Router()

router.get("/tasks", authRequired, getTasks)

router.get("/tasks/:id", authRequired, getTask)

router.post("/tasks", authRequired, createTasks)

router.put("/tasks/:id", authRequired, updateTask)

router.delete("/tasks/:id", authRequired, deleteTask)

export default router;