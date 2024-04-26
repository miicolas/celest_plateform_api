import { query } from '../queries.js';

const signup = async (req, res) => {  

    try {

        const { instagram, firstname, lastname } = req.body;

        await query('INSERT INTO users (instagram, firstname, lastname) VALUES (?, ?, ?)', [instagram, firstname, lastname]);

        res.status(200).redirect('/');
        
    }
    catch (error) {
        res.status(400).json({ error });
    }

}


export { signup };
