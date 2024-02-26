const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const Category = require("../../models/Category/Category");
const User = require("../../models/User/User");

const postController = {
  //!Create post
  createPost: asyncHandler(async (req, res) => {
    // console.log(req.file);
    //get the payload
    const { description, category } = req.body;
    //find the category
    const categoryFound = await Category.findById(category);
    if (!categoryFound) {
      throw new Error("Category not found");
    }
    //find the User
    const userFound = await User.findById(req.user);
    if (!userFound) {
      throw new Error("User not found");
    }
    //find the post by title
    const postCreated = await Post.create({
      description,
      image: req.file,
      author: req.user,
      category,
    });
    //push the post into category
    categoryFound.posts.push(categoryFound?._id);
    //resave the category
    await categoryFound.save();
    //push the post into user
    userFound.posts.push(postCreated?._id);
    await userFound.save();
    res.json({
      status: "Success",
      message: "Post created successfully",
      postCreated,
    });
    // console.log(postCreated);
  }),
  //!list all posts
  fetchAllPost: asyncHandler(async (req, res) => {
    const { category, title, page = 1, limit = 10 } = req.query;
    //Basic filter
    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (title) {
      filter.description = { $regex: title, $options: "i" }; //case sentive
    }
    const posts = await Post.find(filter)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    //total posts
    const totalPosts = await Post.countDocuments(filter);
    res.json({
      status: "success",
      message: "Post fetched successfully",
      posts,
      currentPage: page,
      perPage: limit,
      totalPages: Math.ceil(totalPosts / limit),
    });
  }),
  //! get a post
  getPost: asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    const postFound = await Post.findById(postId);
    res.json({
      status: "success",
      message: "Post fetched successfully",
      postFound,
    });
  }),
  //! update post
  update: asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error("Post not found");
    }
    //update
    const postUpdated = await Post.findByIdAndUpdate(
      postId,
      { title: req.body.title, description: req.body.description },
      { new: true }
    );
    res.json({
      status: "Post updated successfully",
      postUpdated,
    });
  }),
  //! delete post
  delete: asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    await Post.findByIdAndDelete(postId);
    res.json({
      status: "success",
      message: "Post deleted successfully",
    });
  }),
};

module.exports = postController;
