const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { password, email } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];
        if (!user) return res.status(404).json({ message: "Access denied" });

        const decryptedPassword = await bcrypt.compare(password, user.password);
        if (!decryptedPassword) return res.status(404).json({ message: "Invalid password" });

        const jwtToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.header('Authorization', jwtToken).json({ jwtToken });
    } catch (error) {
        res.status(500).json({ message: "Unable to login" });
    }
});

module.exports = router;
