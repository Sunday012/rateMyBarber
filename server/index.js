const express = require('express');
require('dotenv').config();
const app = express();
const pool = require('./db');
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.post('/barbers', async (req, res) => {
    const { name } = req.body;
    try {
        const barbers = await pool.query("INSERT INTO barbers (name) VALUES ($1)", [name]);
        res.status(200).json(barbers);
    } catch (error) {
        console.error(error);
    }
});

app.post("/users", async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const users = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, password]);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
