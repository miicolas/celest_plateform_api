// index.js
import express from "express";
import cookieParser from "cookie-parser";
import ip from "ip";
import router from './router.js';
import { query } from "./queries.js";



const app = express(); // Création de l'application express
const port = process.env.PORT || 3000; // Définition du port d'écoute du serveur

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(router);

// test query to the database

app.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM users');
    res.status(200).json(result);
    } catch (error) {  
    res.status(400).json({ error });
    }
    });


// Start the server
app.listen(port, () => console.log(`Server is running on http://${ip.address()}:${port}`));
