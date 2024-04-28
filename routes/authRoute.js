// routes/auth.js;
import express from "express";
const router = express.Router();
import { signup, login } from "../controllers/authController.js";

router.post("/signup", signup); // Vérifie les données du formulaire d'inscription et crée un nouvel utilisateur
router.post("/login", login); // Vérifie les données du formulaire de connexion et connecte l'utilisateur")

export default router;
