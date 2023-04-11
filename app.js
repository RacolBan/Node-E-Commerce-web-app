const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const accountRouter = require("./routers/account.router");
const userRouter = require("./routers/user.router");
const categoryRouter = require("./routers/category.router");
const manufactureRouter = require("./routers/manufacture.router");
const productRouter = require("./routers/product.router");
const orderRouter = require("./routers/order.router");
const orderDetailRouter = require("./routers/orderDetail.router");
const CartRouter = require("./routers/cart.router");
const PaymentRouter = require("./routers/payment.router");
const sequelize = require('./config/config.model');
const app = express();
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
app.use('/assets',express.static("public/images"));
app.use("/account", accountRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/manufacture", manufactureRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/api", orderDetailRouter);
app.use("/cart", CartRouter);
app.use("/payment", PaymentRouter);

app.get("/", (req, res) => {
  res.json("ok");
});
const port = process.env.PORT || 5000;
sequelize.authenticate()
  .then(() => { 
    app.listen(port, () => {
    console.log(`server running on http://localhost:${port}...`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  })


