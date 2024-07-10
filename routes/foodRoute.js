const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getIdFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  changeOrderStatusController,
} = require("../controllers/foodController");
const { placeOrderController } = require("../controllers/resturantController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = express.Router();

//create
router.post("/create", authMiddleware, createFoodController);

//get all foods
router.get("/getAll", getAllFoodController);

//get single food
router.get("/get/:id", getIdFoodController);

//get food based on resturant
router.get("/getByResturant/:id", getFoodByResturantController);

//get food update
router.put("/update/:id", authMiddleware, updateFoodController);

//delete
router.delete("/delete/:id", deleteFoodController);

//Place Order
router.post("/placeorder", authMiddleware, placeOrderController);

//Order status
router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  changeOrderStatusController
);

module.exports = router;
