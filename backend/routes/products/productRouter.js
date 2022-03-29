const express = require("express");
const router = express.Router();

const {
  Addproduct,
  fetchProduct,
  singleProduct,
  categories,
  searchProducts,
  newSearch,
} = require("../../controller/products");
const upload = require("../../config/upload");
const { protect } = require("../../config/errorMiddlewares");
router.route("/").get(fetchProduct);
router.route("/k?search").get(searchProducts);
router.get("/:title", singleProduct);
router.get("/category/:category", categories);
router.post("/new", upload.array("productImg", 6), protect, Addproduct);
module.exports = router;
