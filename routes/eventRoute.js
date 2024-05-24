// routes/adminRoute.js;
import express from "express";
const router = express.Router();

import {
  createEvent,
  getEvents,
  getEvent,
  participateEvent,
} from "../controllers/eventController.js";
import { authenticateToken } from "../middleware/authToken.js";

router.post("/createevent", createEvent);
router.get("/getevents", getEvents);
router.get("/:id_name", authenticateToken, getEvent);
router.post("/:id_name/participate", authenticateToken, participateEvent);

export default router;
