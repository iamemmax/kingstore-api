const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const fs = require("fs");
const productSchema = require("../model/productSchema");
const path = require("path");
const cloudinary = require("../config/cloudinary");

// fetch all products
const fetchProduct = asyncHandler(async (req, res) => {
  const getProducts = await productSchema
    .find()
    .populate("userId", "-password");
  if (getProducts.length > 0) {
    res.status(200).json({
      count: getProducts.length,
      getProducts,
    });
  }
});
//@DESC filter product
//@ROUTS /products?search=emmax
const searchProduct = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { category: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  try {
    const search = await productSchema.find(keyword);
    if (!search) {
      res.status(400);
      throw new Error("products not found");
    }
    res.status(201).json({
      count: search.length,
      search,
    });
  } catch (error) {
    res.status(501);
    throw new Error(error.message);
  }
});

const Addproduct = asyncHandler(async (req, res) => {
  const {
    title,
    price,
    totalQty,
    description,
    brand,
    category,
    userId,
    productImgs,
  } = req.body;

  // res.send(req.body);
  if (
    !title ||
    !price ||
    !totalQty ||
    !description ||
    !brand ||
    !category ||
    !userId
  ) {
    //fs.unlinkSync(req.files.path);
    res.status(401);
    throw new Error("please fill all field");
  }

  try {
    const productExist = await productSchema.findOne({ title: { $eq: title } });
    if (productExist) {
      res.status(401);
      throw new Error(`${title} already exist`);
    } else {
      let newProduct = await new productSchema({
        title,
        price,
        totalQty,
        description,
        brand,
        category,
        userId,
        productImgs,
      }).save();
      if (newProduct) {
        res.status(200).json({
          res: "ok",
          message: "product uploaded successfully",
          newProduct,
        });
      } else {
        res.status(401);
        throw new Error("something went wrong");
      }
    }
  } catch (error) {
    res.status(501);
    throw new Error(error.message);
  }
});
//@DESC get single product
//@ROUTS /products/title
const singleProduct = asyncHandler(async (req, res) => {
  const product = await productSchema
    .find({ title: req.params.title })
    .populate("userId", "-password");
  try {
    if (product) {
      console.log(product);
      res.status(200).json({
        product,
      });
    }
  } catch (error) {
    res.status(501);
    throw new Error(error.message);
  }
});

// @DESC get product by category
// @ROUTES /products/category/:category
//ACCESS public
const categories = asyncHandler(async (req, res) => {
  const product = await productSchema.find({ category: req.params.category });
  try {
    if (product) {
      res.status(201).json({
        count: product?.length,
        product,
      });
    }
  } catch (error) {
    res.status(501);
    throw new Error(error.message);
  }
  // });

  // @DESC search products
  // @ROUTES /products/search?
  //ACCESS public
  // const searchProducts = asyncHandler(async (req, res) => {
  // res.send(req.query.search);
  // res.send("hello");

  // const keyword = req.query.search
  //   ? {
  //       $or: [
  //         {
  //           title: { $regex: req.query.title, $opt: "i" },
  //           category: { $regex: req.query.category, $opt: "i" },
  //           brand: { $regex: req.query.brand, $opt: "i" },
  //           price: { $regex: req.query.price, $opt: "i" },
  //         },
  //       ],
  //     }
  //   : req.send("not found");
  // const searchItem = await productSchema.find(keyword);
  // try {
  //   if (searchItem) {
  //     res.send(searchItem);
  //   } else {
  //     res.send("product not found");
  //   }
  // } catch (error) {
  //   res.status(501);
  //   throw new Error(error.message);
  // }
});

//@DESC get delete product
//@ROUTS /products/:id
const DeleteProduct = asyncHandler(async (req, res) => {
  const product = await productSchema.findById(req.params.id);

  try {
    if (product) {
      cloudinary.uploader.destroy(product.productImgs[0].img_id);
      // await productSchema.
    }
  } catch (error) {}
});

module.exports = {
  Addproduct,
  fetchProduct,
  searchProduct,
  singleProduct,
  categories,
  DeleteProduct,
};
