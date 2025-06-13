const env = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const postsRoute = require("./routes/postsRoute");

//Init env
env.config();

// Init express
const app = express();

// Body parser
app.use(express.json());

// Posts Router
app.use(postsRoute);

// Listen and Init DB
app.listen(process.env.APP_PORT, () => {
  mongoose
    .connect(`${process.env.DB_HOSTNAME}/${process.env.DB_NAME}`)
    .then(() => {
      console.log("DB Connected successfully");
    });
});
