const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session')
const accountRouter = require("./routers/account.router");
const userRouter = require("./routers/user.router");
const categoryRouter = require("./routers/category.router");
const manufactureRouter = require("./routers/manufacture.router");
const productRouter = require("./routers/product.router");
const orderRouter = require("./routers/order.router");
const orderDetailRouter = require("./routers/orderDetail.router");
const CartRouter = require("./routers/cart.router");
const PaymentRouter = require("./routers/payment.router");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routers/auth.router");
const app = express();


require("dotenv").config();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public/images"));
app.use("/account", accountRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/manufacture", manufactureRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/api", orderDetailRouter);
app.use("/cart", CartRouter);
app.use("/payment", PaymentRouter);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.json("ok");
});

// get PORT from file .env, if novalue will get port = 3000
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}...`);
});
