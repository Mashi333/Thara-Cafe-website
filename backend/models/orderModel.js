const { getPool } = require("../config/db");

const Order = {
  create: async (userId, items, amount, address) => {
    const pool = getPool();
    const [orderResult] = await pool.query(
      "INSERT INTO orders (user_id, amount, address) VALUES (?, ?, ?)",
      [userId, amount, JSON.stringify(address)]
    );
    const orderId = orderResult.insertId;

    if (items && items.length > 0) {
      const values = items.map((item) => [
        orderId,
        item.foodId,
        item.name,
        item.price,
        item.quantity,
        item.image,
      ]);
      await pool.query(
        "INSERT INTO order_items (order_id, food_id, name, price, quantity, image) VALUES ?",
        [values]
      );
    }

    return { id: orderId, userId, items, amount, address };
  },

  findById: async (id) => {
    const pool = getPool();
    const [orders] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
    const order = orders[0];
    if (!order) return null;
    order._id = String(order.id);

    const [items] = await pool.query("SELECT * FROM order_items WHERE order_id = ?", [id]);
    order.items = items;
    return order;
  },

  findByUserId: async (userId) => {
    const pool = getPool();
    const [orders] = await pool.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY date DESC",
      [userId]
    );

    for (let order of orders) {
      order._id = String(order.id);
      const [items] = await pool.query("SELECT * FROM order_items WHERE order_id = ?", [order.id]);
      order.items = items;
    }

    return orders;
  },

  findAll: async () => {
    const pool = getPool();
    const [orders] = await pool.query("SELECT * FROM orders ORDER BY date DESC");

    for (let order of orders) {
      order._id = String(order.id);
      const [items] = await pool.query("SELECT * FROM order_items WHERE order_id = ?", [order.id]);
      order.items = items;
    }

    return orders;
  },

  updatePayment: async (id, payment) => {
    await getPool().query("UPDATE orders SET payment = ? WHERE id = ?", [payment, id]);
  },

  updateStatus: async (id, status) => {
    await getPool().query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
  },

  deleteById: async (id) => {
    const pool = getPool();
    await pool.query("DELETE FROM order_items WHERE order_id = ?", [id]);
    await pool.query("DELETE FROM orders WHERE id = ?", [id]);
  },
};

module.exports = Order;
