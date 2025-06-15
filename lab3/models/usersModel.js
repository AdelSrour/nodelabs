const mongoose = require("mongoose");

// Create users Schema
const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 32,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },
});

//Indexes
usersSchema.index(
  {
    username: 1,
  },
  { unique: 1 }
);

// Create users Model
const Users = mongoose.model("users", usersSchema);

// Export users Model
module.exports = Users;
