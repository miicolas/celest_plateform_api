// routes/adminRoute.js;
import express from "express";
const router = express.Router();

import { createEvent, getEvents } from "../controllers/eventController.js";

router.post("/createevent", createEvent);
router.get("/getevents", getEvents);

export default router;
