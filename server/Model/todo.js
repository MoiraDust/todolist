const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todoSchema = new schema({
  id: { type: Number, required: true },
  content: { type: String, required: true },
  complete: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Todo", todoSchema);
