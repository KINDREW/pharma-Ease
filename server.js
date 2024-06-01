const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const orderRouter = require("./routes/orderRoutes");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/UserRoutes");

// Connect to MongoDB
mongoose.connect(process.env.MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/orders", orderRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
