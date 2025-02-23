import Event from "../models/eventModel.js";

// Fetch all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err });
  }
};

// Add new event
export const addEvent = async (req, res) => {
  try {
    const { title, start, end } = req.body;
    if (!title || !start) {
      return res.status(400).json({ message: "Title and start date are required" });
    }

    const newEvent = new Event({ title, start, end });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: "Error adding event", error: err });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event", error: err });
  }
};
