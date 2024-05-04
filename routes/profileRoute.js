// routes/profileRoute.js;
import express from "express";
const router = express.Router();

import { getProfile } from "../controllers/profileController.js";
import { authenticateToken } from "../middleware/authToken.js";

router.get("/getprofile", authenticateToken, getProfile);

export default router;
