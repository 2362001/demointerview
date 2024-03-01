const express = require("express");
const router = express.Router();
const userinfo = require("../model/userinfo");

router.post("/createUserInfo", async (req, res) => {
  console.log("req body", req.body);
  try {
    const newTable = await userinfo.create(req.body);
    res.status(201).json({
      success: true,
      data: newTable,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const allRecords = await userinfo.find();
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

router.post("/searchByCustomerCode", async (req, res) => {
  try {
    const { customerCode } = req.body;
    const result = await userinfo.find({
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
