const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { connectDB } = require("./config/db");
const initDB = require("./config/initDB");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const startServer = async () => {
  await connectDB();
  await initDB();

  const userRoute = require("./routes/userRoute");
  const foodRoute = require("./routes/foodRoute");
  const cartRoute = require("./routes/cartRoute");
  const orderRoute = require("./routes/orderRoute");

  app.use("/api/user", userRoute);
  app.use("/api/food", foodRoute);
  app.use("/api/cart", cartRoute);
  app.use("/api/order", orderRoute);

  const frontendBuild = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(frontendBuild));

  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(frontendBuild, "index.html"));
    } else {
      res.status(404).json({ message: "API route not found" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
