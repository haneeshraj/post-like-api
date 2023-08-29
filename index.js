import express from "express";
import dotenv from "dotenv";
import "colors";

import { connectDB } from "./utils/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

// API testing
app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT.yellow}`.green);
});
