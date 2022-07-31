const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const accountRouter = require("./routers/account.router");;
const userRouter = require("./routers/user.router");;
const categoryRouter = require("./routers/category.router");;
const manufactureRouter = require('./routers/manufacture.router');
const productRouter = require('./routers/product.router');
const orderRouter = require('./routers/order.router');
const orderDetailRouter = require('./routers/orderDetail.router');
const CartRouter = require('./routers/cart.router');
const PaymentRouter = require('./routers/payment.router');




const app = express();

require("dotenv").config();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use(express.static("public/images"));
// app.use("public/image", express.static(__dirname + "public/image"));
app.use("/account", accountRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/manufacture", manufactureRouter);
app.use("/product", productRouter);
app.use("/api", orderRouter);
app.use("/api", orderDetailRouter);
app.use("/cart", CartRouter);
app.use("/api", PaymentRouter);




app.get("/", (req, res) => {
  res.json("ok")
})





// get PORT from file .env, if novalue will get port = 3000
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}...`);
});
