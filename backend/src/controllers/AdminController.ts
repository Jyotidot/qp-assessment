import { Request, Response } from "express";
import pool from "../config";

export const addGrocery = async (req: Request, res: Response) => {
    const { name, price, stock } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO grocery (name, price, stock) VALUES ($1, $2, $3) RETURNING *",
            [name, price, stock]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

export const getGroceries = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM grocery");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};


export const updateGrocery = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;
        const updatedGrocery = await pool.query(
            "UPDATE grocery SET name = COALESCE($1, name), price = COALESCE($2, price) WHERE id = $3 RETURNING *",
            [name, price, id]
        );
        if (!updatedGrocery) {
            res.status(404).json({ error: "Grocery item not found" });
        }
        res.status(200).json(updatedGrocery.rows[0]);
    } catch (error) {
        console.error("Error updating grocery:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const removeGrocery = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE From grocery where id = $1 RETURNING *", [id]
        );
        res.status(200).send("Grocery item deleted successfully")
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

export const updateStock = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        const updateStock = await pool.query(
            "UPDATE grocery SET stock = $1 WHERE id = $2 RETURNING *",
            [stock, id]
        );
        if (!updateStock) {
            res.status(404).json({ error: "Grocery item not found" });
        }
        res.status(200).json(updateStock.rows[0]);
    } catch (error) {
        console.error("Error updating grocery:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}