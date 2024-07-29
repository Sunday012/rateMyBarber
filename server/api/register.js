const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

router.post('/register', async (req, res) => {
    const { name, email, password, role, account_name } = req.body;
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userCheck.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
    }
    if (!name || !password || !role) {
        return res.status(400).json({ error: 'Please provide username, password, and role' });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    try {
        await pool.query("INSERT INTO users (name, email, password, role, account_name) VALUES($1, $2, $3, $4, $5)", [name, email, hashedPassword, role, account_name]);
        res.status(200).json({ message: "user created successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
