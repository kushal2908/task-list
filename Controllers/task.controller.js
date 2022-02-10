const asyncHandler = require("express-async-handler");
const Task = require("../Models/task");
////////////////////////////////////////////////////////////////////////
// When we use mongoose to interact with MongoDB we get back a promise,
// that is why we are using async
///////////////////////////////////////////////////////////////////////

//@DESC        GET ALL THE TASKS
//@ROUTE       api/tasks
//@METHOD      GET
const getTasks = asyncHandler(async (req, res) => {
  const data = await Task.find();
  res.status(200).json(data);
});

//@DESC        CREATE A TASKS
//@ROUTE       api/tasks
//@METHOD      POST
const postTasks = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }
  const task = await Task.create({
    text: req.body.text,
  });

  res.status(200).json(task);
});

//@DESC        UPDATE A TASK
//@ROUTE       api/tasks/:id
//@METHOD      PUT
const updateTask = asyncHandler(async (req, res) => {
  const getTask = await Task.findById(req.params.id);
  if (!getTask) {
    res.status(400);
    throw new Error("Task not found");
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

//@DESC        DELETE A TASK
//@ROUTE       api/tasks/:id
//@METHOD      DELETE
const deleteTask = asyncHandler(async (req, res) => {
  const getTask = await Task.findById(req.params.id);
  if (!getTask) {
    res.status(400);
    throw Error("Task not found");
  }
  await getTask.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getTasks, postTasks, updateTask, deleteTask };
