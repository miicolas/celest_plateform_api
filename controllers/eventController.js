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

    console.log(events);

    res.status(200).json({ events });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getEvent = async (req, res) => {
  try {
    const { id_name } = req.params;

    const event = await query("SELECT * FROM events WHERE id_name = ?", [
      id_name,
    ]);

    res.status(200).json({ event: event });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const participateEvent = async (req, res) => {
  try {
    const { id_name } = req.params;
    const user = req.user.id;

    await query("INSERT INTO participants (id_event, id_user) VALUES (?, ?)", [
      id_name,
      user,
    ]);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export { createEvent, getEvents, getEvent, participateEvent };
