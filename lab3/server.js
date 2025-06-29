const env = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const postsRoute = require("./routes/postsRoute");
const morgan = require("morgan");
const cors = require("cors");
const usersRoute = require("./routes/usersRoute");
const errorsHandler = require("./middlewares/errorsHandler");
const rateLimiter = require("./middlewares/rateLimiter");
const helmet = require("helmet");
const hpp = require("hpp");

// Init env
env.config();

// Init express
const app = express();

// hpp
app.use(hpp());

// Rate limiter
app.use(rateLimiter);

// helmet
app.use(helmet());

// Morgan
app.use(morgan("combined"));

// Allow all cors
app.use(cors());

// Body parser
app.use(express.json());

// Posts Router
app.use(postsRoute);

// Users Router
app.use(usersRoute);

// Errors Handler
app.use(errorsHandler);

// Listen and Init DB
app.listen(process.env.APP_PORT, () => {
  mongoose
    .connect(
      "mongodb+srv://admin:adel@cluster0.pbvrjoo.mongodb.net/facetook?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("DB Connected successfully");
    });

  // mongoose
  //   .connect(`${process.env.DB_HOSTNAME}/${process.env.DB_NAME}`)
  //   .then(() => {
  //     console.log("DB Connected successfully");
  //   });
});
