const express = require("express");
const router = express.Router();

const {
  Addproduct,
  fetchProduct,
  singleProduct,
  categories,
  searchProduct,
  DeleteProduct,
  updateProduct,
  topSelling,
  RelatedProduct,
  reviewProduct
} = require("../../controller/products");
const upload = require("../../config/upload");
// router.get("/s", newSearch);
const { protect, adminAccess } = require("../../config/errorMiddlewares");
router.route("/").get(fetchProduct);
router.route("/topselling").get(topSelling);
router
  .route("/:id")
  .delete(protect, adminAccess, DeleteProduct)
  .put(protect, adminAccess, updateProduct);
router.get("/:title", singleProduct);
router.get("/related/:category/:id", RelatedProduct);
router.get("/search", searchProduct);

router.get("/category/:category", categories);
router.post("/new", Addproduct);
router.put("/review/:id",protect, reviewProduct);
// router.route("/");
module.exports = router;
