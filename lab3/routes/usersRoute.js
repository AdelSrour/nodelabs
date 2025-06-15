const { Router } = require("express");
const usersController = require("../controllers/usersController");
const { authenticate } = require("../middlewares/auth");
const restrictTo = require("../middlewares/restrictTo");

const usersRoute = Router();

// Register route
usersRoute.post("/users/signup", usersController.register);

// Login route
usersRoute.post("/users/login", usersController.login);

// Get users route
usersRoute.get(
  "/users/list",
  authenticate,
  restrictTo(["admin"]),
  usersController.users
);

module.exports = usersRoute;
