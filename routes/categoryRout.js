const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  getAllCategorController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const router = express.Router();

//route
//create
router.post("/create", authMiddleware, createCategoryController);

//get
router.get("/getAll", getAllCategorController);

//update
router.put("/update/:id", authMiddleware, updateCategoryController);

//delete
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
