import { query } from "../queries.js";

const createEvent = async (req, res) => {
  try {
    const { name, date, places } = req.body;

    await query("INSERT INTO events (name, date, places) VALUES (?, ?, ?)", [
      name,
      date,
      places,
    ]);

    res.status(200).json({ message: "Event created", name, date, places });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await query("SELECT * FROM events");

    res.status(200).json({ events: events });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export { createEvent, getEvents };
