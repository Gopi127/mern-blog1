const express = require("express");
const multer = require("multer");
const storage = require("../../utils/fileupload");
const postController = require("../../controllers/post/postController");
const isAuthenticated = require("../../middlewares/isAuthenticated");

//create multer instance
const upload = multer({ storage });

//! create instance express router

const postRouter = express.Router();
//----Create post--------
postRouter.post(
  "/create",
  isAuthenticated,
  upload.single("image"),
  postController.createPost
);
//-----List-all-posts-------------
postRouter.get("/", postController.fetchAllPost);
//-------Update-post-----------
postRouter.put("/:postId", isAuthenticated, postController.update);
//-----------Get a post---------
postRouter.get("/:postId", postController.getPost);
//---------Delete post------------
postRouter.delete("/:postId", isAuthenticated, postController.delete);

module.exports = postRouter;
