const { Router } = require("express");
const {
  createPost,
  getPosts,
  getPostByID,
  updatePostByID,
  deletePostByID,
} = require("../controllers/postsController");
const { authenticate } = require("../middlewares/auth");

const postsRoute = Router();

// Create new post
postsRoute.post("/api/posts", authenticate, createPost);

// Get all posts
postsRoute.get("/api/posts", authenticate, getPosts);

// Get post by id
postsRoute.get("/api/posts/:id", authenticate, getPostByID);

// Update post by id
postsRoute.patch("/api/posts/:id", authenticate, updatePostByID);

// Delete post by id
postsRoute.delete("/api/posts/:id", authenticate, deletePostByID);

// Export route
module.exports = postsRoute;
