import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/product.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/api/products", router);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}...`);
});
