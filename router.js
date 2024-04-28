import express from "express";

import authRoute from "./routes/authRoute.js";
import eventRoute from "./routes/eventRoute.js";

const router = express.Router();

// Routes publiques
router.use("/auth", authRoute);
router.use("/event", eventRoute);

export default router;
