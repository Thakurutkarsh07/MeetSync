import express from "express";
import { getEvents, addEvent, deleteEvent } from "../controllers/eventController.js";

const router = express.Router();

// Fetch all events
router.get("/", getEvents);

// Add new event
router.post("/", addEvent);

// Delete an event by ID
router.delete("/:id", deleteEvent);

export default router;
