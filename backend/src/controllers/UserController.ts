import { Request, Response } from "express";
import pool from "../config";

export const getAvailableGroceries = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM grocery WHERE stock > 0");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

export const createOrder = async (req: Request, res: Response) => {
    const { userId, items } = req.body;
    const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    try {
        const result = await pool.query(
            "INSERT INTO orders (user_id, items, total) VALUES ($1, $2, $3) RETURNING *",
            [userId, JSON.stringify(items), total]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
