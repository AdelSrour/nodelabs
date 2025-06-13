const { Router } = require("express");
const {
  createPost,
  getPosts,
  getPostByID,
  updatePostByID,
  deletePostByID,
} = require("../controllers/postsController");

const postsRoute = Router();

// Create new post
postsRoute.post("/api/posts", createPost);

// Get all posts
postsRoute.get("/api/posts", getPosts);

// Get post by id
postsRoute.get("/api/posts/:id", getPostByID);

// Update post by id
postsRoute.patch("/api/posts/:id", updatePostByID);

// Delete post by id
postsRoute.delete("/api/posts/:id", deletePostByID);

// Export route
module.exports = postsRoute;
