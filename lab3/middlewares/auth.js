const AppError = require("../util/AppError");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // No token
  if (!token) {
    throw new AppError("token is required");
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      throw new AppError("Invalid token");
    } else {
      // Attach decoded user data to request
      req.user = user;
      next();
    }
  });
};

module.exports = {
  authenticate,
};
