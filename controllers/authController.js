const signup = async (req, res) => {  

    try {
        const name = 'test'

        res.status(201).json({ message : 'Utilisateur créé avec succès'});
    }
    catch (error) {
        res.status(400).json({ error });
    }

}


export { signup };
