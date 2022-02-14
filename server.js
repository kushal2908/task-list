const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./Middleware/errorMiddleware");
const connectDB = require("./Config/db");

// Initializing Express as app
const app = express();

// Connecting MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/tasks", require("./Routes/task.routes"));
app.use("/api/users", require("./Routes/user.routes"));

// Error Handler
app.use(errorHandler);

// Setting PORT
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`===========================`);
  console.log(`Server Started at: ${port}`);
  console.log(`===========================`);
});
