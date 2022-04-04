const express = require("express");
const router = express.Router();
const {
  AddCategory,
  ListCategory,
  updateCategory,
  removeCategory,
} = require("../../controller/category");
const { adminAccess, protect } = require("../../config/errorMiddlewares");

router.route("/").get(protect, adminAccess, ListCategory);
router.route("/new").post(protect, adminAccess, AddCategory);
router
  .route("/:id")
  .put(protect, adminAccess, updateCategory)
  .delete(protect, adminAccess, removeCategory);
module.exports = router;
