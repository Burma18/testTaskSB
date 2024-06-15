import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./auth/auth.module";
import userRoutes from "./user/user.module";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", authRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
