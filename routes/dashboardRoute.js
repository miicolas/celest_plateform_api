//routes/dashboardRoute.js

import express from "express";
const router = express.Router();

import { authenticateToken } from "../middleware/authToken.js";
import { getDashboard } from "../controllers/dashboardController.js";

router.get("/", authenticateToken, getDashboard);

export default router;
