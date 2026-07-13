const { getPool } = require("../config/db");

const User = {
  findByEmail: async (email) => {
    const [rows] = await getPool().query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
  },

  findById: async (id) => {
    const [rows] = await getPool().query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
  },

  create: async (name, email, password) => {
    const [result] = await getPool().query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return { id: result.insertId, name, email };
  },
};

module.exports = User;
