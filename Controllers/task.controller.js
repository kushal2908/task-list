const asyncHandler = require("express-async-handler"); //to handle exceptions
const task = require("../Models/task");
const Task = require("../Models/task");
const User = require("../Models/user");
////////////////////////////////////////////////////////////////////////
// When we use mongoose to interact with MongoDB we get back a promise,
// that is why we are using async
///////////////////////////////////////////////////////////////////////

//@DESC        GET ALL THE TASKS
//@ROUTE       GET api/tasks
//@ACESS       Private
const getTasks = asyncHandler(async (req, res) => {
  const data = await Task.find({ user: req.user.id });
  res.status(200).json(data);
});

//@DESC        CREATE A TASK
//@ROUTE       POST api/tasks
//@ACESS       Private
const postTasks = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }
  const task = await Task.create({
    text: req.body.text,
    user: req.user.id, //to pass the created by [user id]
  });

  res.status(200).json(task);
});

//@DESC        UPDATE A TASK
//@ROUTE       PUT api/tasks/:id
//@ACESS       Private
const updateTask = asyncHandler(async (req, res) => {
  const getTask = await Task.findById(req.params.id);
  if (!getTask) {
    res.status(400);
    throw new Error("Task not found");
  }

  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  //Making sure the logged in user matches  the task user
  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

//@DESC        DELETE A TASK
//@ROUTE       DELETE api/tasks/:id
//@ACESS       Private
const deleteTask = asyncHandler(async (req, res) => {
  const getTask = await Task.findById(req.params.id);
  if (!getTask) {
    res.status(400);
    throw Error("Task not found");
  }
  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  //Making sure the logged in user matches  the task user
  if (getTask.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await getTask.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getTasks, postTasks, updateTask, deleteTask };
