const mongoose = require("mongoose");

const connectDB = async () => {
    try {
      // const URI = process.env.CONNECTION_STRING;
      // mongoose.connect(URI);
      const conn = await mongoose.connect(process.env.CONNECTION_STRING);
      // console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;
  