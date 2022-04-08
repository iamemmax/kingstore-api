const express = require("express");
const { protect, adminAccess } = require("../../config/errorMiddlewares");
const router = express.Router();
const {
  addUser,
  loginUser,
  activateUser,
  logoutUser,
  getUser,
  deleteUser,
  getAllUsers,
  updateReguser,
  ChangePassword,
} = require("../../controller/user");
const upload = require("../../config/upload");
router.post("/register", upload.single("profile"), addUser);
router.post("/login", loginUser);
router.get("/allUsers", protect, adminAccess, getAllUsers);
router.get("/:id", protect, getUser);
router.put("/update/:id", updateReguser);
router.put("/verify/:id/:token", activateUser);
router.delete("/delete/:id", adminAccess, deleteUser);
// router.put("/edit/:id", protect, updatedUser);
router.post("/logout", logoutUser);
router.put("/change-pass/:id", ChangePassword);

// admin access

module.exports = router;
