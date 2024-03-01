const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  customerCode: {
    type: String,
    required: [true, "Please enter your customer code!"],
  },
  customerName: {
    type: String,
    require: [true, "Please enter your full name"],
  },
  dayVoucher: {
    type: String,
    require: [true, "Please enter your day voucher"],
  },
  totalMoney: {
    type: String,
    require: [true, "Please enter your total money"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("userinfos", UserInfoSchema);
