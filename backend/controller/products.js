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
    .sort({ createdAt: "-1" })
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
    sold,
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
//@DESC get related product
const RelatedProduct = asyncHandler(async (req, res) => {
  try {
    await productSchema
      .find({
        category: { $eq: req.params.category },
        _id: { $ne: req.params.id },
      })
      .exec((err, related) => {
        if (err) {
          res.status(401);
          console.log(err);
        } else {
          res.status(201).json({
            res: "ok",
            related,
          });
        }
      });
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
      product.productImgs.map((img) => {
        console.log(img.img_id);
        cloudinary.uploader.destroy(img.img_id);
      });
      await productSchema
        .findByIdAndDelete(req.params.id)
        .exec((err, product) => {
          if (err) {
            res.status(401);
            throw new Error("unable to delete product");
          } else {
            res.status(201).json({
              message: `${product.title} deleted successfully`,
              product,
            });
          }
        });
    }
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});
//@DESC get update product
//@ROUTS /products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await productSchema.findById(req.params.id);
  let = {
    title,
    price,
    totalQty,
    description,
    brand,
    category,
    productImgs,
    userId,
    sold,
  } = req.body;

  try {
    if (product) {
      await productSchema
        .findByIdAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              title: title || product.title,
              description: description || product.description,
              category: category || product.category,
              productImgs: productImgs || product.productImgs,
              userId: userId || product.userId,
            },
            $inc: {
              price: price || product.price,
              totalQty: totalQty || product.totalQty,
              sold: sold || product.sold,
            },
          },
          { new: true }
        )
        .exec((err, product) => {
          if (err) {
            res.status(401);
            throw new Error(err.message);
          } else {
            product.productImgs.map((img) => {
              console.log(img.img_id);
              cloudinary.uploader.destroy(img.img_id);
            });
            res.status(201).json({
              message: `${product.title} updated successfully`,
              product,
            });
          }
        });
    }
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

//@DESC get fetch top selling products
//@ROUTS /products

const topSelling = asyncHandler(async (req, res) => {
  // let order = req.query.order ? req.query.order : "asc";
  // let sortBy = req.query.sortBy ? req.query.sortBy : "sold";
  // let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  await productSchema
    .find({ sold: { $gt: 0 } })
    .sort("asc")
    .exec((err, product) => {
      if (err) {
        res.status(401);
        throw new Error("product not found");
      } else {
        res.status(201).json({
          res: "ok",
          product,
        });
      }
    });
});
module.exports = {
  Addproduct,
  fetchProduct,
  searchProduct,
  singleProduct,
  categories,
  DeleteProduct,
  updateProduct,
  topSelling,
  RelatedProduct,
};
