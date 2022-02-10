const express = require("express");
const router = express.Router();
const { getTasks, postTasks, updateTask, deleteTask } = require("../Controllers/task.controller");

// GET & POST Controller
router.route("/").get(getTasks).post(postTasks);

// PUT & DELETE Controller
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
 