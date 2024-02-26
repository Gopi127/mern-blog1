const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const categoryController = require("../../controllers/category/categoryController");

//! create instance express router

const categoriesRouter = express.Router();
//----Create category--------
categoriesRouter.post(
  "/create",
  isAuthenticated,
  categoryController.createCategory
);
//-----List-all-category-------------
categoriesRouter.get("/", categoryController.fetchAllCategories);
//-------Update-category-----------
categoriesRouter.put(
  "/:categoryId",
  isAuthenticated,
  categoryController.update
);
//-----------Get a category---------
categoriesRouter.get("/:categoryId", categoryController.getCategory);
//---------Delete category------------
categoriesRouter.delete(
  "/:categoryId",
  isAuthenticated,
  categoryController.delete
);

module.exports = categoriesRouter;
