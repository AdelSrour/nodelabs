const mongoose = require("mongoose");
const Posts = require("../models/postsModel");

// Create a new post
const createPost = (req, res) => {
  // Get body data
  const { body } = req;

  // Insert data into db
  Posts.insertOne({
    title: body.title,
    description: body.description,
  });

  return app.status(201).json({
    status: true,
    message: "Post added successfully",
  });
};

// Get all posts
const getPosts = (req, res) => {
  // Get all posts
  const posts = Posts.find({});

  return res.status(200).json({
    status: true,
    message: "Posts fetch was successfully",
    data: posts,
  });
};

// Get a post by ID
const getPostByID = (req, res) => {
  // Post id
  const postID = req.params.id;

  // Get post by id
  const post = Posts.findById(postID);

  return res.status(200).json({
    status: true,
    message: "Post fetch was successfully",
    data: post,
  });
};

// Update a post
const updatePostByID = (req, res) => {
  // Post id
  const postID = req.params.id;

  // Update db
  Posts.updateOne(
    { id: postID },
    {
      $set: {
        title: body.title,
        description: body.description,
      },
    }
  );

  return res.status(202).json({
    status: true,
    message: "Post updated successfully",
  });
};

// Delete a post
const deletePostByID = (req, res) => {
  // Post id
  const postID = req.params.id;

  // Delete from db
  Posts.findByIdAndDelete(postID);

  return res.status(202).json({
    status: true,
    message: "Post deleted successfully",
  });
};

// Export our functions
module.exports = {
  createPost,
  getPosts,
  getPostByID,
  updatePostByID,
  deletePostByID,
};
