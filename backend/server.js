const express = require("express");
require("dotenv").config();
require("colors");
const cors = require("cors");
const app = express();
const path = require("path");
const db = require("./config/db");
const session = require("express-session");
const passport = require("passport");
const { errorHandler } = require("./config/errorMiddlewares");

// @DESC middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// @DESC initializing datatbase
db();
app.use(
  session({
    secret: process.env.SECRETE,
    cookie: { maxAge: 3600000, path: "/" },
    resave: true,
    saveUninitialized: true,
  })
);

require("./config/passport")(passport);

app.use(passport.initialize());
app.use(passport.session());
// @DESC routes
// @ACCESS public

app.use("/api/user", require("./routes/user/UserRoutes"));
app.use("/api/products", require("./routes/products/productRouter"));
app.use("/api/category", require("./routes/category/categoryRouter"));
app.use(errorHandler);

// @DESC  port list
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server started running on port ${PORT}`.yellow);
});
