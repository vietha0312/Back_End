import express from "express";
import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import mongoose from "mongoose";
const app = express();

app.use(express.json());
app.use("/api", productRouter);
app.use("/api", authRouter);
mongoose.connect(
  "mongodb+srv://pvietha301:03122003@angular123.trvmz8z.mongodb.net/web17302"
);

export const viteNodeApp = app;
