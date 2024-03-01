const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectionDatabase = require("./database/db");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
connectionDatabase();

//controller
const userInfoSchema = require("./controller/inforController");
const productSchema = require("./controller/productController");
const productPurchaseSchema = require("./controller/productPurchaseController");

//routes
app.use("/api/v1/userInfor", userInfoSchema);
app.use("/api/v1/product", productSchema);
app.use("/api/v1/productpurchase", productPurchaseSchema);

app.listen(process.env.PORT, () => {
  console.log(`Backend is running http://localhost:${process.env.PORT}`);
});
