const mongoose = require("mongoose");

const ProductPurchaseSchema = new mongoose.Schema({
  customerCode: {
    type: String,
    required: [true, "Please enter your customer code!"],
  },
  productCode: {
    type: String,
    required: [true, "Please enter your productCode"],
  },
  productName: {
    type: String,
    require: [true, "Please enter your productName"],
  },
  count: {
    type: Number,
    require: [true, "Please enter your count"],
  },
  productBill: {
    type: Number,
    require: [true, "Please enter your productBill"],
  },
  productTotalCount: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

ProductPurchaseSchema.pre("save", function (next) {
  this.productTotalCount = this.count * this.productBill;
  next();
});

module.exports = mongoose.model("productpurchases", ProductPurchaseSchema);
