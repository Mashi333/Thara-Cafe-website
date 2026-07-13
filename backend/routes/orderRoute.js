const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const { getPool } = require("../config/db");
const authMiddleware = require("../middleware/auth");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/place", authMiddleware, async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const order = await Order.create(userId, items, amount, address);

    await getPool().query("DELETE FROM cart_items WHERE user_id = ?", [userId]);

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:4000'}/verify?success=true&orderId=${order.id}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:4000'}/verify?success=false&orderId=${order.id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/verify", authMiddleware, async (req, res) => {
  try {
    const { orderId, success } = req.body;

    if (success === "true") {
      await Order.updatePayment(orderId, true);
      res.json({ success: true, message: "Payment verified" });
    } else {
      await Order.deleteById(orderId);
      res.json({ success: false, message: "Payment failed, order cancelled" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/userorders", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.findByUserId(userId);
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/list", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/status", async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.updateStatus(orderId, status);
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
