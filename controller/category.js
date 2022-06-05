const express = require("express");
const categorySchema = require("../model/categorySchema");
const asyncHandler = require("express-async-handler");

// @DESC create category
// @ROUTES "/api/category/new"
//ACCESS admin
exports.AddCategory = asyncHandler(async (req, res) => {
  let { name } = req.body;

  if (!name) {
    res.status(401);
    throw new Error("Please enter category name!");
  }
  const categoryExist = await categorySchema.findOne({ name: name });
  if (categoryExist) {
    res.status(401);
    throw new Error(" category  already exist!");
  }
  try {
    await new categorySchema({
      name,
    }).save((err, category) => {
      if (err) {
        res.status(401);
        console.log(err);
      }
      res.status(201).json({
        res: "ok",
        category,
      });
    });
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

// @DESC Read/list category
// @ROUTES "/api/category"
//ACCESS admin
exports.ListCategory = asyncHandler(async (req, res) => {
  try {
    await categorySchema.find().exec((err, categorys) => {
      if (err) {
        res.status(401);
        throw new Error(" category not found!");
      }
      if (categorys.length > 0) {
        res.status(201).json({
          count: categorys.length,
          categorys,
        });
      }
    });
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

// @DESC update category
// @ROUTES "/api/category/:id"
//ACCESS admin
exports.updateCategory = asyncHandler(async (req, res) => {
  const category = categorySchema.findById(req.params.id);
  if (!category) {
    res.status(401);
    throw new Error(" category not found!");
  } else {
    await categorySchema
      .findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name || category.name } },
        { new: true }
      )
      .exec((err, result) => {
        if (err) {
          res.status(401);
          throw new Error(" unable to update category!");
        }
        if (result) {
          res.status(201).json({
            message: "category updated successFully",
            result,
          });
        }
      });
  }
});
// @DESC delete category
// @ROUTES "/api/category/:id"
//ACCESS admin
exports.removeCategory = asyncHandler(async (req, res) => {
  try {
    await categorySchema
      .findByIdAndDelete(req.params.id)
      .exec((err, success) => {
        if (err) {
          res.status(401);
          throw new Error("category not found");
        }
        res.status(201).json({
          message: `${success.name} is deleted successfully`,
          success,
        });
      });
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});
