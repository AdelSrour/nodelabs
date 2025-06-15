const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Users = require("../models/usersModel");
const AppError = require("../util/AppError");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
  // Get request body
  const { body } = req;

  // Check input
  if (
    !body ||
    !body.username ||
    !body.password ||
    !body.rePassword ||
    !body.email
  ) {
    throw new AppError(
      "Please enter username and password and email address.",
      400
    );
  }

  // Get username
  const username = body.username;
  if (!/^[a-zA-Z0-9]{4,32}$/.test(username)) {
    throw new AppError(
      "Username must be in english characters and length between 4 to 32 characters.",
      400
    );
  }

  //Get Password
  let password = body.password;
  if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
    throw new AppError(
      "Password must be at least 8 characters long, include at least 1 uppercase letter, 1 number, and 1 special character.",
      400
    );
  }

  // Get Re-password
  const rePassword = body.rePassword;
  if (rePassword !== password) {
    throw new AppError("Password and re-Password must be equal", 400);
  }

  // Get Email
  const email = body.email;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError("Email must be valid email address", 400);
  }

  //Hash the password
  password = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));

  // Add user into db
  await Users.insertOne({
    username,
    password,
    email,
    role: "user",
  })
    .then(() => {
      // Return response to client if there is no errors
      return res.status(201).json({
        status: true,
        message: "User created successfully",
      });
    })
    .catch((err) => {
      // There is a DB error lets catch it and tell the user
      next(err);
    });
}

async function login(req, res, next) {
  // Get request body
  const { body } = req;

  // Check input
  if (!body || !body.username || !body.password) {
    throw new AppError("Please enter username and password.", 400);
  }

  // Get username
  const username = body.username;
  if (!/^[a-zA-Z0-9]{4,32}$/.test(username)) {
    throw new AppError(
      "Username must be in english characters and length between 4 to 32 characters.",
      400
    );
  }

  //Get Password
  let password = body.password;
  if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
    throw new AppError(
      "Password must be at least 8 characters long, include at least 1 uppercase letter, 1 number, and 1 special character.",
      400
    );
  }

  // Add user into db
  await Users.findOne({ username })
    .then(async (user) => {
      // Verify username and password
      if (user && (await bcrypt.compare(password, user.password))) {
        // Generate JWT token
        const JWT_TOKEN = jwt.sign(
          {
            username: user.username,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_KEY,
          { expiresIn: "1d" }
        );
        return res.status(200).json({
          status: true,
          message: "Logged in Successfully",
          session: JWT_TOKEN,
        });
      }
      // Login details are not valid
      throw new AppError("Username or password are incorrect", 400);
    })
    .catch((err) => {
      // There is a DB error lets catch it and tell the user
      next(err);
    });
}

async function users(req, res) {
  await Users.find({}, { username: 1, email: 1, role: 1 })
    .then((users) => {
      return res.status(200).json({
        status: true,
        message: users,
      });
    })
    .catch((err) => {
      throw Error(err);
    });
}

module.exports = { register, login, users };
