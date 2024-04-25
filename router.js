import express from "express";

import authRoute from "./routes/authRoute.js";

const router = express.Router();

// Routes publiques
router.use("/auth", authRoute);


export default router;