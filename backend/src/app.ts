import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import adminRoutes from "./routes/AdminRoutes";
import userRoutes from "./routes/UserRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

export default app;
