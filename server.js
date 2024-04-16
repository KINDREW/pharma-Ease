const mongoose = require("mongoose");
const app = require("./middleware");
const orderRouter = require("./routes/orderRoutes");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/UserRoutes");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Routes
app.use("/orders", orderRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
