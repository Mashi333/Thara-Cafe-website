const { getPool } = require("./db");

const seedFoods = [
  { name: "Greek salad", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "/uploads/food_1.png", category: "Salad" },
  { name: "Veg salad", description: "Food provides essential nutrients for overall health and well-being", price: 18, image: "/uploads/food_2.png", category: "Salad" },
  { name: "Clover Salad", description: "Food provides essential nutrients for overall health and well-being", price: 16, image: "/uploads/food_3.png", category: "Salad" },
  { name: "Chicken Salad", description: "Food provides essential nutrients for overall health and well-being", price: 24, image: "/uploads/food_4.png", category: "Salad" },
  { name: "Lasagna Rolls", description: "Food provides essential nutrients for overall health and well-being", price: 14, image: "/uploads/food_5.png", category: "Rolls" },
  { name: "Peri Peri Rolls", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "/uploads/food_6.png", category: "Rolls" },
  { name: "Chicken Rolls", description: "Food provides essential nutrients for overall health and well-being", price: 20, image: "/uploads/food_7.png", category: "Rolls" },
  { name: "Veg Rolls", description: "Food provides essential nutrients for overall health and well-being", price: 15, image: "/uploads/food_8.png", category: "Rolls" },
  { name: "Ripple Ice Cream", description: "Food provides essential nutrients for overall health and well-being", price: 14, image: "/uploads/food_9.png", category: "Deserts" },
  { name: "Fruit Ice Cream", description: "Food provides essential nutrients for overall health and well-being", price: 22, image: "/uploads/food_10.png", category: "Deserts" },
  { name: "Jar Ice Cream", description: "Food provides essential nutrients for overall health and well-being", price: 10, image: "/uploads/food_11.png", category: "Deserts" },
  { name: "Vanilla Ice Cream", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "/uploads/food_12.png", category: "Deserts" },
  { name: "Chicken Sandwich", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "/uploads/food_13.png", category: "Sandwich" },
  { name: "Vegan Sandwich", description: "Food provides essential nutrients for overall health and well-being", price: 18, image: "/uploads/food_14.png", category: "Sandwich" },
  { name: "Grilled Sandwich", description: "Food provides essential nutrients for overall health and well-being", price: 16, image: "/uploads/food_15.png", category: "Sandwich" },
  { name: "Bread Sandwich", description: "Food provides essential nutrients for overall health and well-being", price: 24, image: "/uploads/food_16.png", category: "Sandwich" },
  { name: "Cup Cake", description: "Food provides essential nutrients for overall health and well-being", price: 14, image: "/uploads/food_17.png", category: "Cake" },
  { name: "Vegan Cake", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "/uploads/food_18.png", category: "Cake" },
  { name: "Butterscotch Cake", description: "Food provides essential nutrients for overall health and well-being", price: 20, image: "/uploads/food_19.png", category: "Cake" },
  { name: "Sliced Cake", description: "Food provides essential nutrients for overall health and well-being", price: 15, image: "/uploads/food_20.png", category: "Cake" },
  { name: "Garlic Mushroom", description: "Food provides essential nutrients for overall health and well-being", price: 14, image: "/uploads/food_21.png", category: "Pure Veg" },
  { name: "Fried Cauliflower", description: "Food provides essential nutrients for overall health and well-being", price: 22, image: "/uploads/food_22.png", category: "Pure Veg" },
  { name: "Mix Veg Pulao", description: "Food provides essential nutrients for overall health and well-being", price: 10, image: "/uploads/food_23.png", category: "Pure Veg" },
  { name: "Rice Zucchini", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "/uploads/food_24.png", category: "Pure Veg" },
  { name: "Cheese Pasta", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "/uploads/food_25.png", category: "Pasta" },
  { name: "Tomato Pasta", description: "Food provides essential nutrients for overall health and well-being", price: 18, image: "/uploads/food_26.png", category: "Pasta" },
  { name: "Creamy Pasta", description: "Food provides essential nutrients for overall health and well-being", price: 16, image: "/uploads/food_27.png", category: "Pasta" },
  { name: "Chicken Pasta", description: "Food provides essential nutrients for overall health and well-being", price: 24, image: "/uploads/food_28.png", category: "Pasta" },
  { name: "Buttter Noodles", description: "Food provides essential nutrients for overall health and well-being", price: 14, image: "/uploads/food_29.png", category: "Noodles" },
  { name: "Veg Noodles", description: "Food provides essential nutrients for overall health and well-being", price: 12, image: "/uploads/food_30.png", category: "Noodles" },
  { name: "Somen Noodles", description: "Food provides essential nutrients for overall health and well-being", price: 20, image: "/uploads/food_31.png", category: "Noodles" },
  { name: "Cooked Noodles", description: "Food provides essential nutrients for overall health and well-being", price: 15, image: "/uploads/food_32.png", category: "Noodles" },
];

const initDB = async () => {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS foods (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      image VARCHAR(500) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      food_id INT NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE,
      UNIQUE KEY unique_user_food (user_id, food_id)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      address JSON,
      status ENUM('Food Processing','Out for delivery','Delivered') DEFAULT 'Food Processing',
      payment_method VARCHAR(50) DEFAULT 'stripe',
      payment BOOLEAN DEFAULT FALSE,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      food_id INT NOT NULL,
      name VARCHAR(255),
      price DECIMAL(10,2),
      quantity INT,
      image VARCHAR(500),
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
    )
  `);

  const [rows] = await pool.query("SELECT COUNT(*) as count FROM foods");
  if (rows[0].count < 32) {
    await pool.query("DELETE FROM foods");
    for (const food of seedFoods) {
      await pool.query(
        "INSERT INTO foods (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)",
        [food.name, food.description, food.price, food.image, food.category]
      );
    }
    console.log("Seeded 32 food items");
  }

  console.log("MySQL tables initialized");
};

module.exports = initDB;
