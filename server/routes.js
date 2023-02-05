const express = require("express");
const router = express.Router();
const todoController = require("./todosController");

router.get("/getAll", todoController.getAllTodo);
router.post("/add", todoController.insertTodos);
router.post("/edit", todoController.alterTodo);
router.post("/delete/:id", todoController.deleteTodo);

module.exports = router;
