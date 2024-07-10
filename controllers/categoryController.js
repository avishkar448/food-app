const categoryModel = require("../models/categoryModel");

//create category
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide title",
      });
    }

    const category = new categoryModel({ title, imageUrl });
    await category.save();

    res.status(200).send({
      success: true,
      message: "category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create api",
      error,
    });
  }
};

const getAllCategorController = async (req, res) => {
  try {
    const getAllCat = await categoryModel.find({}).select("title");
    if (!getAllCat) {
      res.status(404).send({
        success: false,
        message: "Not found categories",
      });
    }

    res.status(200).send({
      success: true,
      message: "All categories",
      totalCategories: getAllCat.length,
      getAllCat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all category",
      error,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const { title, imageUrl } = req.body;
    if (!categoryID) {
      res.status(500).send({
        success: false,
        message: "Please provide Id",
      });
    }

    const updateCategory = await categoryModel.findByIdAndUpdate(
      categoryID,
      { title, imageUrl },
      { new: true }
    );

    if (!updateCategory) {
      res.status(500).send({
        success: false,
        message: "No category found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      updateCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error to update category",
      error,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      res.status(500).send({
        success: false,
        message: "Please provide Id",
      });
    }

    await categoryModel.findByIdAndDelete(categoryId);

    res.status(200).send({
      success: true,
      message: "Suucessfully delete data",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error to delete",
      error
    });
  }
};
module.exports = {
  createCategoryController,
  getAllCategorController,
  updateCategoryController,
  deleteCategoryController,
};
