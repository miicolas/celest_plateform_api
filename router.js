import express from "express";

import authRoute from "./routes/authRoute.js";
import eventRoute from "./routes/eventRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import profileRoute from "./routes/profileRoute.js";

const router = express.Router();

// Routes publiques
router.use("/auth", authRoute);
router.use("/event", eventRoute);
router.use("/dashboard", dashboardRoute);
router.use("/profile", profileRoute);

export default router;
