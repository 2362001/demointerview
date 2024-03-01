const express = require("express");
const router = express.Router();
const product = require("../model/product");

router.post("/createProduct", async (req, res) => {
  try {
    const newTable = await product.create(req.body);
    res.status(201).json({
      success: true,
      data: newTable,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getAllProduct", async (req, res) => {
  try {
    const allRecords = await product.find();
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

router.get("/getSumProduct", async (req, res) => {
  try {
    const result = await product.aggregate([
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

router.post("/getByCustomerCode", async (req, res) => {
  try {
    const { customerCode } = req.body;
    const result = await product.find({
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
