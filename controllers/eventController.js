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
    console.log(req.params);
    const { id_name } = req.params;

    console.log(id_name);

    const id_user = req.user.id;

    console.log(id_user);
    const event = await query("SELECT * FROM events WHERE id_name = ?", [
      id_name,
    ]);

    console.log(event);

    const data_user = await query(
      "SELECT * FROM user_events WHERE id_event = ? AND where id_user = ?",
      [event[0].id_event, id_user],
    );

    console.log(participants_data);

    res.status(200).json({ event: event, data_user: data_user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const participateEvent = async (req, res) => {
  try {
    const { id_name } = req.params;
    const user = req.user.id;
    const { status } = req.body;

    const id_event = await query(
      "SELECT id_event FROM events WHERE id_name = ?",
      [id_name],
    );

    let object_id_event = id_event[0].id_event;

    const request = await query(
      "INSERT INTO user_events (id_user, id_event, status) VALUES (?, ?, ?)",
      [user, object_id_event, status],
    );

    if (request.affectedRows === 0) {
      return res.status(400).json({ message: "Participation pas enregisté" });
    }

    res.status(200).json({ message: "Ta parcipation est bien enregistré" });
  } catch (error) {
    console.error("Error participating in event:", error);
    res.status(500).json({ error: "Veuillez réessayer plus tard" });
  }
};

export { createEvent, getEvents, getEvent, participateEvent };
