const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`---------------------------------------`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`---------------------------------------`);
  } catch (error) {
    console.log("DB Connection Error: ");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
