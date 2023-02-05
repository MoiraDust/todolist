const todoModel = require("./Model/todo");
const mongoose = require("mongoose");

async function insertTodos(req, res) {
  console.log("insertTods");
  const data = req.body;
  const todo = new todoModel();
  todo.id = data.id;
  todo.content = data.content;
  todo.complete = data.complete;
  try {
    await todo.save();
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(400);
  }
}

// async function deleteTodo() {}

async function alterTodo(req, res) {
  console.log("alterTodo");
  const data = req.body;
  const oldId = data.id;
  const newItem = data.newData;
  const filter = { id: oldId };
  const newData = {
    id: newItem.id,
    content: newItem.content,
    complete: newItem.complete,
  };
  try {
    // await todoModel.findOneAndUpdate(filter, newData);
    const todo = await todoModel.find(filter);
    if (todo) {
      await todoModel.findOneAndUpdate(filter, newData);
      res.sendStatus(200);
    } else {
      console.log("no such a todo item");
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(400);
  }
}

async function getAllTodo(req, res) {
  try {
    console.log("getAllTodo");
    const todos = await todoModel.find();
    res.json(todos);
  } catch (err) {
    res.sendError(err.message);
    console.log(err.message);
  }
}

module.exports = {
  insertTodos,
  alterTodo,
  getAllTodo,
};
