const corse = require("cors");
const passport = require("./utils/passport-config");
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/connectDB");
const postRouter = require("./router/post/postRouter");
const userRouter = require("./router/user/userRouter");
const categoriesRouter = require("./router/category/categoriesRouter");
const planRoutes = require("./router/plan/planRouter");

//connect  to MongoDB database
connectDB();

const app = express();
//!PORT
const PORT = 4000;

//Middlewares
app.use(express.json()); //Used to Pass json date
//corse middleware
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(corse(corsOptions));
//Passport middleware
app.use(passport.initialize());
app.use(cookieParser()); // automatically parses the cookie
//! Route Handlers
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/plans", planRoutes);
//! Not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found on server" });
});

//! Error handling middleware
app.use((err, req, res, next) => {
  //prepare the error message
  const message = err.message;
  const stack = err.stack;
  res.status(500).json({ message, stack });
});

//!Start the server
app.listen(
  PORT,
  console.log(`Server is up and running on http://localhost:${PORT}`)
);
