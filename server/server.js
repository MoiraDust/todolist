const express = require("express");
const app = express();

const mongoose = require("mongoose");
const MONGO_URL = "mongodb+srv://admin:admin@cluster0.zgbvtqh.mongodb.net/test";
const port = 8080;

const routes = require("./routes");
const cors = require("cors");

const bodyParser = require("body-parser");

// connect the db
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`port ${port} start`);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/test", (req, res) => {
  console.log("test connection");
  res.send({ data: "hello world" });
});

app.use("/api", routes);
