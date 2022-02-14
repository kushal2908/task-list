const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler"); //to handle exceptions
const User = require("../Models/user");
const { create } = require("../Models/user");
///////////////////////////////////////////////////////////////////////////
//@DESC        Register a user
//@ROUTE       POST api/users/register
//@ACESS       Public
///////////////////////////////////////////////////////////////////////////
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check is any input fields are empty or not
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please, add all fields");
  }

  //Checks if user already exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User with this email already exist");
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.json({ msg: "Register User" });
});

///////////////////////////////////////////////////////////////////////////
//@DESC        Authenticate a user
//@ROUTE       POST api/users/login
//@ACESS       Public
///////////////////////////////////////////////////////////////////////////
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for email
  const user = await User.findOne({ email });

  // Check for password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      Success: true,
      statuscode: 200,
      message: "User logged in successfuly",
      token: generateJWT(user.id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentils");
  }
  res.json({ msg: "Login User" });
});

///////////////////////////////////////////////////////////////////////////
//@DESC        Get a user
//@ROUTE       GET api/users/user
//@ACESS       Private
///////////////////////////////////////////////////////////////////////////
const getUser = asyncHandler(async (req, res) => {
  res.json({ msg: "Logged in user data display" });
});

///////////////////////////////////////////////////////////////////////////
//Generate JWT
///////////////////////////////////////////////////////////////////////////
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getUser,
};
