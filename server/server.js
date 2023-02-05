const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb+srv://admin:admin@cluster0.zgbvtqh.mongodb.net/test";
const port = 8080;

// connect the db
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`port ${port} start`);
});

router.get("/test", () => {
  console.log("test connection");
  res.send({ data: "hello world" });
});