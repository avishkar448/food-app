const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//register
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;
    //validation
    if (!username || !email || !password || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    // check user
    const existing = await userModel.findOne({ email });

    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already registered please Login",
      });
    }

    //hashing
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create  new user
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
      address,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

//Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }

    //check user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: true,
        message: "Invalid Password",
      });
    }

    //Json web token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login api",
      error,
    });
  }
};

module.exports = { registerController, loginController };
