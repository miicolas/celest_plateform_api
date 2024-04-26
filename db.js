import mysql from "mysql2";

const pool = mysql.createPool({ // Création d'un pool de connexion à la base de données 

  host: process.env.HOST,
  port: process.env.PORT ,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
  
});


export default pool;

