const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/user");

////////////////////////////////////////////
// This middleware does the work
// where a route  needs token to access
///////////////////////////////////////////

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from the header
      token = req.headers.authorization.split(" ")[1]; //split the space between Bearer and token

      //varify the token
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      //get user from the token
      req.user = await User.findById(decode.id).select("-password"); // id is set inside the token
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized (No Token)");
  }
});

module.exports = { protect };
