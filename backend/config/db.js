const mysql = require("mysql2/promise");

let pool;

const connectDB = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
    });

    const connection = await pool.getConnection();
    console.log("MySQL Connected");
    connection.release();

    return pool;
  } catch (error) {
    console.error("MySQL connection error:", error.message);
    process.exit(1);
  }
};

const getPool = () => pool;

module.exports = { connectDB, getPool };
