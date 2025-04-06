import express from "express";
import { createOrder, getAvailableGroceries } from "../controllers/UserController";

const router = express.Router();

router.get("/grocery", getAvailableGroceries);
router.post("/order", createOrder);

export default router;
