require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB is connected successfully...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
