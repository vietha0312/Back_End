import express from "express";
import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import mongoose from "mongoose";
import categoryRouter from "./routes/category";
import cors from "cors"
const app = express();


// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // Có thể thay "*" bằng domain cụ thể mà bạn cho phép truy cập.
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.json());
app.use(cors());
app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
// mongoose.connect(
//   "mongodb+srv://pvietha301:03122003@angular123.trvmz8z.mongodb.net/web17302"
// );

mongoose.connect("mongodb+srv://pvietha301:03122003@angular123.trvmz8z.mongodb.net/web17302", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

export const viteNodeApp = app;
