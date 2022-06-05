const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const db = asyncHandler(async () => {
  const database = await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (database) {
    console.log(
      `database connected ${database.connection.host} successfully`.blue
    );
  } else {
    console.log("database error");
    process.exist(1);
  }
});
module.exports = db;
