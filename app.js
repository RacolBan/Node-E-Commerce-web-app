const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const accountRouter = require("./routers/account.router");
const userRouter = require("./routers/user.router");
const categoryRouter = require("./routers/category.router");
const manufactureRouter = require('./routers/manufacture.router')
const productRouter = require('./routers/product.router')
const uploadRouter = require('./routers/upload.router')

const app = express();

app.set("view engine", "ejs")
require("dotenv").config();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use(express.static("public"));
// app.use("public/image", express.static(__dirname + "public/image"));
app.use("/account", accountRouter);
app.use("/user", userRouter);
app.use("/api", categoryRouter);
app.use("/api", manufactureRouter);
app.use("/api", productRouter);
app.use("/", uploadRouter);






// get PORT from file .env, if novalue will get port = 3000
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}...`);
});
