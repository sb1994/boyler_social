const mongoose = require("mongoose");

async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connection successful");
  } catch (error) {
    console.log("MongoDB error");
    console.log(error);
    process.exit(1);
  }
}

module.exports = dbConnect;
