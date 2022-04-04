const express = require("express");
const router = express.Router();

const {
  Addproduct,
  fetchProduct,
  singleProduct,
  categories,
  searchProduct,
  DeleteProduct,
  // newSearch,
} = require("../../controller/products");
const upload = require("../../config/upload");
// router.get("/s", newSearch);
const { protect, adminAccess } = require("../../config/errorMiddlewares");
router.route("/").get(fetchProduct);
router.route("/").get(fetchProduct);
router.route("/:id").delete(protect, adminAccess, DeleteProduct);
router.get("/:title", singleProduct);

router.get("/category/:category", categories);
router.post(
  "/new",
  upload.array("productImg", 6),
  protect,
  adminAccess,
  Addproduct
);
// router.route("/");
module.exports = router;
