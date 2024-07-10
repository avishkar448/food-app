const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
//get user
const getUserController = async (req, res) => {
  // res.status(200).send("User Data")
  // console.log(req.body.id)

  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id }, { _id: 0 });

    if (!user) {
      res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    //user password
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "user data get succefully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user API",
      error,
    });
  }
};

//user Update
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //update
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();
    res.status(200).send({
      success: true,
      message: "user update successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in update user",
      error,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    //get data
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide valid old or new password",
      });
    }

    //check user compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old Password",
      });
    }

    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in password update API",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    //get data
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide valid email and answer",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "user Not found",
      });
    }

    //hashPassword
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await res.send({
      success: true,
      message: "Passowrd reset successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in password reset",
      error,
    });
  }
};

//delete user
const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "delete account successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error to delete",
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
};
