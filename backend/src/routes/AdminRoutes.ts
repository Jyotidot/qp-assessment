import express from "express";
import { addGrocery, getGroceries, removeGrocery, updateGrocery, updateStock } from "../controllers/AdminController";

const router = express.Router();

router.post("/grocery", addGrocery);
router.get("/grocery", getGroceries);
router.put("/grocery/:id", updateGrocery)
router.delete("/grocery/:id", removeGrocery);
router.patch("/grocery/:id/stock", updateStock);

export default router;
