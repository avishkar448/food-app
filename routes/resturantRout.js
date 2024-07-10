const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantController,
  deleteResturantController,
} = require("../controllers/resturantController");
const router = express.Router();

//
//create resturant
router.post("/create", authMiddleware, createResturantController);

//get
router.get("/getAll", getAllResturantController);

//get resturant by id
router.get("/get/:id", getResturantController);

//delete
router.delete("/delete/:id", authMiddleware, deleteResturantController);

module.exports = router;
