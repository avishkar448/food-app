const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTag,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;
    if (!title || !description || !price || !resturant) {
      return res.status(500).send({
        success: false,
        message: "Please provide required data",
      });
    }

    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTag,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    });

    await newFood.save();
    res.status(200).send({
      success: true,
      message: "Successfully created food",
      newFood,
    });
  } catch (error) {
    console.log(object);
    res.status(500).send({
      success: false,
      message: "Error in create API",
      error,
    });
  }
};

const getAllFoodController = async (req, res) => {
  try {
    const food = await foodModel.find({});
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "food not avilable",
      });
    }

    res.status(200).send({
      success: true,
      message: "Succesfully get all food",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error to get all food",
      error,
    });
  }
};

//get single food
const getIdFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "Provide food is",
      });
    }
    const foodItem = await foodModel.findById(foodId);

    if (!foodItem) {
      res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food Item",
      foodItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error to get food",
      error,
    });
  }
};

const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(500).send({
        success: false,
        message: "Please provide valid Id",
      });
    }

    const getFoodByResturant = await foodModel.find({ resturant: resturantId });

    if (!getFoodByResturant) {
      return res.status(404).send({
        success: false,
        message: "Not found resturant",
      });
    }

    res.status(200).send({
      success: true,
      message: "food from resturant",
      getFoodByResturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get food resturant api",
    });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "Error to update food",
      });
    }

    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Error to find the food item",
      });
    }

    const {
      title,
      description,
      price,
      imageUrl,
      foodTag,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      ratingCount,
    } = req.body;

    const updateFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTag,
        category,
        code,
        isAvailable,
        resturant,
        rating,
        ratingCount,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Successfully Updated the data",
      updateFood,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error to update food",
      error,
    });
  }
};

//delete
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "Error in delete API",
        error,
      });
    }

    const deleteFood = await foodModel.findByIdAndDelete(foodId);

    if (!deleteFood) {
      return res.status(404).send({
        success: false,
        message: "Mot found the food",
      });
    }

    res.status(200).send({
      success: true,
      message: "Sucessfully deleted Food item",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in delete api",
      error,
    });
  }
};

const changeOrderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      return res.status(500).send({
        success: true,
        message: "Please provide valid order Id",
        error,
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "order status updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in change Order API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getIdFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  changeOrderStatusController,
};
