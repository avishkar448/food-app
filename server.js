const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan"); //middleware
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//enviroment
dotenv.config();

//Database connection
connectDb();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route controller
app.use("/api/v1/test", require("./routes/testRoute"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRout"));
app.use("/api/v1/category", require("./routes/categoryRout"));
app.use("/api/v1/food", require("./routes/foodRoute"));

//route
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Food server by Avishkar</h1>");
});

//Port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.white.bgGreen);
});
