import express from "express";
import { getAll, get, create, remove } from "../controllers/category";
const router = express.Router();
router.get("/categories", getAll);
router.get("/categories/:id", get);
router.post("/categories", create);
router.delete("/categories/:id", remove);
export default router;
