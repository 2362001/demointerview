const express = require("express");
const router = express.Router();
const productpurchase = require("../model/product-purchase");

router.post("/createProductPurchase", async (req, res) => {
  try {
    const newTable = await productpurchase.create(req.body);
    res.status(201).json({
      success: true,
      data: newTable,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

router.get("/getAllProductPurchase", async (req, res) => {
  try {
    const allRecords = await productpurchase.find();
    res.status(200).json({
      success: true,
      data: allRecords,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/getSumProductPurchase", async (req, res) => {
  try {
    const result = await productpurchase.aggregate([
      {
        $group: {
          _id: null,
          totalCount: { $sum: "$productTotalCount" },
        },
      },
    ]);
    const totalCount = result[0].totalCount;
    res.status(200).json({
      success: true,
      totalCount: totalCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/getByCustomerCodePurchase", async (req, res) => {
  try {
    const { customerCode } = req.body;
    const result = await productpurchase.find({
      customerCode,
    });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
