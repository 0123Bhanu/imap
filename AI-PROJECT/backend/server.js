import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { startIMAP } from "./imap/imapClient.js";
import emailRoutes from "./routes/emailRoutes.js";
import cors from "cors";
dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/emails", emailRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
startIMAP();
