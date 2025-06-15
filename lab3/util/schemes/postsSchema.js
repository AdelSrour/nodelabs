const Joi = require("joi");

const postsSchema = Joi.object({
  title: Joi.string().min(3).max(256).required().messages({
    "any.required": "description is required",
  }),
  description: Joi.string().min(3).max(1024).required().messages({
    "any.required": "description is required",
  }),
});

module.exports = postsSchema;
