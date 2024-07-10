const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//get user
router.get("/getuser", authMiddleware, getUserController);

//update user
router.put("/updateUser", authMiddleware, updateUserController);

//password update
router.post("/upadtePass", authMiddleware, updatePasswordController);

//password reset 
router.post("/resetPass",authMiddleware,resetPasswordController)

//delete user
router.delete('/deleteUser/:id',authMiddleware,deleteUserController)



module.exports = router;
