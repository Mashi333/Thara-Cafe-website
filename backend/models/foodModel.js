const { getPool } = require("../config/db");

const Food = {
  findAll: async () => {
    const [rows] = await getPool().query("SELECT * FROM foods ORDER BY created_at DESC");
    return rows.map((r) => ({ ...r, _id: String(r.id) }));
  },

  findById: async (id) => {
    const [rows] = await getPool().query("SELECT * FROM foods WHERE id = ?", [id]);
    if (!rows[0]) return null;
    return { ...rows[0], _id: String(rows[0].id) };
  },

  create: async (name, description, price, image, category) => {
    const [result] = await getPool().query(
      "INSERT INTO foods (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, image, category]
    );
    return { _id: String(result.insertId), id: result.insertId, name, description, price, image, category };
  },

  deleteById: async (id) => {
    await getPool().query("DELETE FROM foods WHERE id = ?", [id]);
  },
};

module.exports = Food;
