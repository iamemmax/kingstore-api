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

  // if (!req.files) {
  //   res.status(401);
  //   throw new Error("please choose a product image(s)");
  // }
  // if (req.files.length > 6) {
  //   res.status(401);
  //   throw new Error("upload maximum of six (s) images");
  // }

  // rezising images
  // let productPix = [];

  // let myfiles = req.files;
  // for (let i = 0; i < myfiles.length; i++) {
  //   const file = myfiles[i];
  //   await sharp(file.path)
  //     .flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
  //     .resize(500, 500)
  //     .png({ quality: 90, force: true });

  //   // .toFile(`./backend/public/product/${file.filename}.png`);
  //   // const result = await cloudinary.uploader.upload(file.path);

  //   // if (!result) {
  //   //   res.status(401);
  //   //   throw new Error("image uploading failed");
  //   // }
  //   // const dbFile = {
  //   //   filename: file.originalname,
  //   //   // cloudinary_id: result.public_id,
  //   //   // img_url: result.secure_url,
  //   // };
  //   productPix.push(file.originalname);
  //   fs.unlinkSync(file.path);
  // }
  // console.log(req.files);

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
      res.send(product);
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
});

// @DESC search products
// @ROUTES /products/search?
//ACCESS public
const searchProducts = asyncHandler(async (req, res) => {
  res.send(req.query.search);
  const keyword = req.query.search
    ? {
        $or: [
          {
            title: { $regex: req.query.title, $opt: "i" },
            category: { $regex: req.query.category, $opt: "i" },
            brand: { $regex: req.query.brand, $opt: "i" },
            price: { $regex: req.query.price, $opt: "i" },
          },
        ],
      }
    : req.send("not found");
  const search = await productSchema.find(keyword);
  try {
    if (search) {
      res.send(search);
    } else {
      res.send("product not found");
    }
  } catch (error) {
    res.status(501);
    throw new Error(error.message);
  }
});
const newSearch = asyncHandler(async (req, res) => {
  console.log(req.query.search);
});
module.exports = {
  Addproduct,
  fetchProduct,
  singleProduct,
  categories,
  searchProducts,
  newSearch,
};
