const orderModel = require("../models/orderModel");
const resturantModel = require("../models/resturantModel");

const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address",
      });
    }

    const createResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await createResturant.save();

    res.status(200).send({
      success: true,
      message: "New Resturant created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in creating resturant",
      error,
    });
  }
};

//get all resturant
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      res.status(404).send({
        success: true,
        message: "No resturat found",
      });
    }

    res.status(200).send({
      success: true,
      message: "successfully get all resturants",
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error to get all resturants",
      error,
    });
  }
};

//get resturant by id
const getResturantController = async (req, res) => {
  try {
    const resturentId = req.params.id;
    if (!resturentId) {
      return res.status(500).send({
        success: false,
        message: "Please provide valid id",
      });
    }

    const resturant = await resturantModel.findById({ _id: resturentId });
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "Error to get data",
      });
    }
    res.status(200).send({
      success: true,
      message: "data get succesfully",
      resturant,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error to get data",
      error,
    });
  }
};

//delete
const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(500).send({
        success: false,
        message: "please provide id",
      });
    }

    const resturant = await resturantModel.findByIdAndDelete(resturantId);
    if (!resturant) {
      res.status(404).send({
        success: false,
        message: "Cannot find the resturant",
      });
    }

    res.status(200).send({
      success: true,
      message: "Resturant delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete resturant api",
    });
  }
};

const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please provide food cart or payment method",
      });
    }
    let total = 0;

    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payments: total,
      buyer: req.body.id,
    });

    await newOrder.save();

    res.status(200).send({
      success: true,
      message: "Order placed Succefully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Place Order API",
    });
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantController,
  deleteResturantController,
  placeOrderController,
};
