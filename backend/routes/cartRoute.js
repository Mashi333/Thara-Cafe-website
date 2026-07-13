const express = require("express");
const router = express.Router();
const { getPool } = require("../config/db");
const authMiddleware = require("../middleware/auth");

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const itemId = Number(req.body.itemId);
    const userId = req.userId;
    const pool = getPool();

    const [existing] = await pool.query(
      "SELECT * FROM cart_items WHERE user_id = ? AND food_id = ?",
      [userId, itemId]
    );

    if (existing.length > 0) {
      await pool.query(
        "UPDATE cart_items SET quantity = quantity + 1 WHERE user_id = ? AND food_id = ?",
        [userId, itemId]
      );
    } else {
      await pool.query(
        "INSERT INTO cart_items (user_id, food_id, quantity) VALUES (?, ?, 1)",
        [userId, itemId]
      );
    }

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/remove", authMiddleware, async (req, res) => {
  try {
    const itemId = Number(req.body.itemId);
    const userId = req.userId;
    const pool = getPool();

    const [existing] = await pool.query(
      "SELECT * FROM cart_items WHERE user_id = ? AND food_id = ?",
      [userId, itemId]
    );

    if (existing.length > 0) {
      if (existing[0].quantity > 1) {
        await pool.query(
          "UPDATE cart_items SET quantity = quantity - 1 WHERE user_id = ? AND food_id = ?",
          [userId, itemId]
        );
      } else {
        await pool.query(
          "DELETE FROM cart_items WHERE user_id = ? AND food_id = ?",
          [userId, itemId]
        );
      }
    }

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/get", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const pool = getPool();

    const [rows] = await pool.query(
      "SELECT food_id, quantity FROM cart_items WHERE user_id = ?",
      [userId]
    );

    const cartData = {};
    rows.forEach((row) => {
      cartData[row.food_id] = row.quantity;
    });

    res.json({ success: true, data: cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
