import { query } from "../queries.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import BadWordsFilter from "bad-words";

const signup = async (req, res) => {
  try {
    const { instagram, firstname, lastname, password } = req.body;

    // Vérification des champs requis
    if (!instagram || !firstname || !lastname || !password) {
      return res
        .status(400)
        .json({ message: "Veuillez remplir tous les champs" });
    }

    const checkInstagram = await query(
      "SELECT * FROM users WHERE instagram = ?",
      [instagram],
    );

    // Vérification de l'existence de l'utilisateur
    if (checkInstagram.length > 0) {
      return res.status(400).json({
        message:
          "L'utilisateur existe déjà, contact @celest_pulv si tu n'as jamais créer de compte",
      });
    }

    // Vérification des insultes
    // Création d'une instance de la classe BadWordsFilter
    // et ajout de mots à filtrer

    const filter = new BadWordsFilter();
    filter.addWords(
      "hitler",
      "staline",
      "mussolini",
      "pinochet",
      "pol pot",
      "bin laden",
      "mao",
      "gengis khan",
      "idriss deby",
      "kadafi",
      "kim jong-un",
      "hassan ii",
      "duvalier",
      "lenine",
      "ceausescu",
      "franco",
      "horthy",
      "mobutu",
      "hussein",
      "gaddafi",
      "mugabe",
      "aït ahmed",
      "maréchal pétain",
      "al capone",
      "al-assad",
      "göring",
      "bokassa",
      "milošević",
      "béria",
      "perón",
      "bush",
      "saddam",
      "hollande",
      "trump",
      "kim jong-il",
      "fuck",
      "shit",
      "asshole",
      "bitch",
      "cunt",
      "motherfucker",
      "dickhead",
      "bastard",
      "cock",
      "pussy",
      "wanker",
      "slut",
      "whore",
      "arsehole",
      "bollocks",
      "twat",
      "faggot",
      "nigger",
      "spastic",
      "retard",
      "damn",
      "crap",
      "piss",
      "fucking",
      "shitty",
      "ass",
      "douchebag",
      "fucker",
      "cunt",
      "pissed",
      "wank",
      "bugger",
      "bog",
      "knob",
      "darn",
      "sod",
      "dick",
      "git",
      "screw",
      "bullshit",
      "fuckwit",
      "cocksucker",
      "dickweed",
      "shithead",
      "douche",
      "cockhead",
      "shitface",
      "twatwaffle",
      "merde",
      "pute",
      "enculé",
      "connard",
      "salope",
      "bâtard",
      "foutre",
      "cul",
      "bite",
      "encule",
      "connasse",
      "baise",
      "enculeur",
      "salaud",
      "nique",
      "taré",
      "crotte",
      "crétin",
      "putain",
      "merdeux",
      "enculée",
      "connasse",
      "enfoiré",
      "niquer",
      "gueule",
      "foutre",
      "crade",
      "bordel",
      "vicieux",
      "vulgaire",
      "pétasse",
      "tarlouze",
      "enculer",
      "nique",
      "vermine",
      "ordure",
      "chiure",
      "satané",
      "connasse",
      "emmerdeur",
      "pourri",
      "méchant",
      "niais",
      "niaiseux",
      "vicelard",
      "trouduc",
      "tapette",
      "déchet",
      "enflure",
      "tordu",
      "culé",
      "clc",
      "pulv",
      "va",
      "bde",
    );

    if (
      filter.isProfane(instagram) ||
      filter.isProfane(firstname) ||
      filter.isProfane(lastname)
    ) {
      return res.status(400).json({ message: "Insultes interdites" });
    }

    // Vérification de la longueur du mot de passe
    if (password.length < 8) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères",
      });
    }

    // Vérification de la longueur du nom d'utilisateur, prénom et nom
    if (instagram.length < 3 || firstname.length < 3 || lastname.length < 3) {
      return res
        .status(400)
        .json({ message: "Les champs doivent contenir au moins 3 caractères" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await query(
      "INSERT INTO users (instagram, firstname, lastname, password) VALUES (?, ?, ?, ?)",
      [instagram, firstname, lastname, hashedPassword],
    );

    res.status(200).json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { instagram, password } = req.body;
    console.log(instagram);
    console.log(password);

    const user = await query(
      "SELECT id, password FROM users WHERE instagram = ?",
      [instagram],
    );

    // console.log(user);

    if (user.length === 0) {
      return res.status(400).json({ message: "L'utilisateur n'existe pas" });
    }
    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Generate and send the JWT token
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // console.log(token, "token login");

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export { signup, login };
