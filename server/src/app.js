const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const carsRoutes = require("./routes/car.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const cookieParser = require("cookie-parser");
const setupSwagger = require("./utils/setupswagger.js");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
setupSwagger(app);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://spectacular-blini-a5bda5.netlify.app/",
    ],
    credentials: true,
  })
);
app.use("/api/cars", carsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
