const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/auth");

// ======================
// GET TASKS
// ======================
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      msg: "Error fetching tasks"
    });
  }
});

// ======================
// ADD TASK
// ======================
router.post("/", auth, async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body;

    const newTask = new Task({
      title,
      priority,
      dueDate,
      completed: false
    });

    await newTask.save();

    res.json(newTask);

  } catch (err) {
    res.status(500).json({
      msg: "Error adding task"
    });
  }
});

// ======================
// DELETE TASK
// ======================
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      msg: "Task deleted"
    });

  } catch (err) {
    res.status(500).json({
      msg: "Delete failed"
    });
  }
});

// ======================
// TOGGLE COMPLETE
// ======================
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    task.completed = !task.completed;

    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).json({
      msg: "Update failed"
    });
  }
});

module.exports = router;