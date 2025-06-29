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

  const title = sanitizeInput(body.title);
  const description = sanitizeInput(body.description);

  // Insert data into db
  await Posts.insertOne({
    title,
    description,
    createdBy: req.username,
  });

  return res.status(201).json({
    status: true,
    message: "Post added successfully",
  });
};

// Get all posts
const getPosts = async (req, res) => {
  // Get all posts
  const posts = await Posts.find(
    {},
    { title: 1, description: 1, createdBy: 1 }
  );

  // Flag posts created by current user
  const flaggedPosts = posts.map((post) => {
    const postObj = post.toObject();
    postObj.isOwner = post.createdBy === req.username;
    return postObj;
  });

  return res.status(200).json({
    status: true,
    message: "Posts fetch was successfully",
    data: flaggedPosts,
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

  // Update post only if it was created by same user
  await Posts.updateOne(
    { _id: postID, createdBy: req.username }, // Add condition here
    {
      $set: {
        title: body.title,
        description: body.description,
      },
    }
  )
    .then((edited) => {
      if (edited) {
        return res.status(202).json({
          status: true,
          message: "Post updated successfully",
        });
      }
      throw new AppError("You are not allowed to update this post");
    })
    .catch((err) => {
      throw Error(err);
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

  // Delete from db if its created by the same user
  await Posts.findOneAndDelete({ _id: postID, createdBy: req.username })
    .then((deletedPost) => {
      if (deletedPost) {
        return res.status(202).json({
          status: true,
          message: "Post deleted successfully",
        });
      }
      throw new AppError("You are not allowed to delete this post");
    })
    .catch((err) => {
      throw Error(err);
    });
};

function sanitizeInput(str) {
  if (typeof str !== "string") return str;

  // Remove MongoDB operators and suspicious keys
  str = str.replace(/\$|\./g, "");

  // Remove HTML tags and JS events
  str = str.replace(/<.*?>/g, ""); // Remove tags like <script>, <img>, etc.

  // Remove script-related strings or JS functions
  str = str.replace(
    /(on\w+)=|javascript:|eval\(|alert\(|<script.*?>.*?<\/script>/gi,
    ""
  );

  return str;
}

// Export our functions
module.exports = {
  createPost,
  getPosts,
  getPostByID,
  updatePostByID,
  deletePostByID,
};
