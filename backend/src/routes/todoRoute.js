const express = require("express");
const router = express.Router();
const {
  addTodo,
  getTodo,
  todoChange,
} = require("../controllers/todoControllers");
const authMiddleware = require("../middleware/autMiddleware");
router.get("/task", authMiddleware, getTodo);
router.post("/task", authMiddleware, addTodo);
router.put("/task/:id/status", todoChange);
module.exports = router;
