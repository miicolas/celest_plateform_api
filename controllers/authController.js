const signup = async (req, res) => {  

    try {
        res.status(201).json({ message: "Utilisateur créé !" });
    }
    catch (error) {
        res.status(400).json({ error });
    }

}


export { signup };
