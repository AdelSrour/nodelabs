const mongoose = require("mongoose");
const Posts = require("../models/postsModel");

// Create a new post
const createPost = async (req, res) => {
  // Get body data
  const { body } = req;

  // valdiate input
  if (!body.title || !body.description) {
    return res
      .status(400)
      .json({ status: false, message: "Please enter title and description" });
  }

  // Insert data into db
  await Posts.insertOne({
    title: body.title,
    description: body.description,
  });

  return res.status(201).json({
    status: true,
    message: "Post added successfully",
  });
};

// Get all posts
const getPosts = async (req, res) => {
  // Get all posts
  const posts = await Posts.find({}, { title: 1, description: 1 });

  return res.status(200).json({
    status: true,
    message: "Posts fetch was successfully",
    data: posts,
  });
};

// Get a post by ID
const getPostByID = async (req, res) => {
  // Post id
  const postID = req.params.id;

  //Validate ID
  if (!mongoose.isValidObjectId(postID)) {
    return res.status(400).json({ status: false, message: "ID is not valid" });
  }

  // Get post by id
  const post = await Posts.findById(postID);

  return res.status(200).json({
    status: true,
    message: "Post fetch was successfully",
    data: post,
  });
};

// Update a post
const updatePostByID = async (req, res) => {
  // Post id
  const postID = req.params.id;

  //Validate ID
  if (!mongoose.isValidObjectId(postID)) {
    return res.status(400).json({ status: false, message: "ID is not valid" });
  }

  // Update db
  await Posts.updateOne(
    { _id: postID },
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
const deletePostByID = async (req, res) => {
  // Post id
  const postID = req.params.id;

  //Validate ID
  if (!mongoose.isValidObjectId(postID)) {
    return res.status(400).json({ status: false, message: "ID is not valid" });
  }

  // Delete from db
  await Posts.findByIdAndDelete(postID);

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
