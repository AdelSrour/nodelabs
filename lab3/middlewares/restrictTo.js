const AppError = require("../util/AppError");

const restrictTo = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError(`You don't have access to this resources`, 403);
    }
    next();
  };
};

module.exports = restrictTo;
