const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");

async function connectDB() {

  try {

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true
    });
    console.log("Connected to mongoDB");

  } catch (error) {
    console.log("Could not connect to mongo DB");
  }

}

module.exports = connectDB;
