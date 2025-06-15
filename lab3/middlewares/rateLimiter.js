const rateLimit = require("express-rate-limit");
const AppError = require("../util/AppError");

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
  handler: () => {
    throw new AppError(
      "You are sending too many requests, your IP has been blocked",
      429
    );
  },
});

module.exports = rateLimiter;
