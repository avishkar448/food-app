const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //get token
    const token = req.header("authorization").split(" ")[1];
   // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: "Un-Authorize User",
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in auth API",
      error,
    });
  }
};
