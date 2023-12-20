const mongoose = require("mongoose");
const todoTaskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: "Undone",
  },
});
module.exports = mongoose.model("TodoTask", todoTaskSchema);
