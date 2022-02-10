const asyncHandler = require("express-async-handler");

////////////////////////////////////////////////////////////////////////
// When we use mongoose to interact with MongoDB we get back a promise,
// that is why we are using async
///////////////////////////////////////////////////////////////////////

//@DESC        GET ALL THE TASKS
//@ROUTE       api/tasks
//@METHOD      GET
const getTasks = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "List of all Tasks" });
});

//@DESC        CREATE A TASKS
//@ROUTE       api/tasks
//@METHOD      POST
const postTasks = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }
  res.status(200).json({ msg: "Create a Tasks" });
});

//@DESC        UPDATE A TASK
//@ROUTE       api/tasks/:id
//@METHOD      PUT
const updateTask = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Updated Task ${req.params.id}` });
});

//@DESC        DELETE A TASK
//@ROUTE       api/tasks/:id
//@METHOD      DELETE
const deleteTask = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Deleted Task ${req.params.id}` });
});

module.exports = { getTasks, postTasks, updateTask, deleteTask };
