// routes/adminRoute.js;
import express from "express";
const router = express.Router();

import {
  createEvent,
  getEvents,
  getEvent,
  participateEvent,
} from "../controllers/eventController.js";

router.post("/createevent", createEvent);
router.get("/getevents", getEvents);
router.get("/:id_name", getEvent);
router.post("/:id_name/participate", participateEvent);

export default router;
