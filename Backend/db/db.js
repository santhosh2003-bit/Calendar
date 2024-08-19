const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const ConnectDb = async () => {
  try {
    mongoose.connect(process.env.MONGOOSE_URL);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};
module.exports = ConnectDb;
