import express from "express";

import mongoose from "mongoose";
const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://pvietha301:03122003@angular123.trvmz8z.mongodb.net/"
);

export const viteNodeApp = app;
