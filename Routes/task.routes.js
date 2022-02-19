const express = require("express");
const router = express.Router();
const { getTasks, postTasks, updateTask, deleteTask } = require("../Controllers/task.controller");
const { protect } = require("../Middleware/authMiddleware");
// GET & POST Controller
router.route("/").get(protect, getTasks).post(protect, postTasks);

// PUT & DELETE Controller
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
