const express = require("express");
const router = express.Router();
const Food = require("../models/foodModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const food = await Food.create(name, description, Number(price), image, category);
    res.json({ success: true, message: "Food item added", data: food });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/list", async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/remove", async (req, res) => {
  try {
    const { id } = req.body;
    await Food.deleteById(id);
    res.json({ success: true, message: "Food item removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
