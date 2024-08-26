require("dotenv").config()
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const SECRET_KEY = process.env.SECRET_KEY;


module.exports={PORT,DB_URL,SECRET_KEY}