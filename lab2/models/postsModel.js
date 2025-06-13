const mongoose = require("mongoose");

// Posts schema
const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 256,
  },
  description: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 1024,
  },
});

// Posts Model
const Posts = mongoose.model("posts", postsSchema);

// Export Posts
module.exports = Posts;
