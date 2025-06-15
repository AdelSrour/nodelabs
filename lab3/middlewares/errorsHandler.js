const errorsHandler = (error, req, res, next) => {
  // Database duplicated entry
  if (error.code === 11000) {
    return res.status(400).json({
      status: false,
      message: `This ${Object.keys(error.keyValue)[0]} is already taken`,
    });
  }

  //Default AppError
  return res.status(error.statusCode || 500).json({
    status: false,
    message: error.message,
  });
  next();
};

module.exports = errorsHandler;
