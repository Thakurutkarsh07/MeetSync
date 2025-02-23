import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import { scheduleReminders } from "./services/reminderService.js";
import eventRoutes from "./routes/eventRoutes.js"
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();
scheduleReminders(); // Start the reminder service

// Routes
app.use("/api/todos", todoRoutes);

app.use("/api/events", eventRoutes);  // Add new event route here


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
