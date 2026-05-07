const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,

  priority: {
    type: String,
    default: "Low"
  },

  dueDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);