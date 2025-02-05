const express = require('express');
require('dotenv').config();
const app = express();
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const registerRoute = require('./api/register');
const loginRoute = require('./api/login');


app.use(express.json());


//middleware
const authenticateToken = (req, res, next) => {
    const rawtoken = req.header('Authorization');
    const token = rawtoken.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).send('Invalid Token');
    }
};


app.use(cors({
    origin: ['http://127.0.0.1:5500', 'https://rate-my-barbers.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get('/', (req, res) => {
    res.send('Hello, Team!');
});

app.use('/api', registerRoute);
app.use('/api', loginRoute);


// add a barber profile
app.post('/barbers', authenticateToken, async (req, res) => {
    if(req.user.role !== 'barber') return res.status(403).json({error: "Invalid role"})
    const { name, location, barber_shop_name, expertise, phone_number, account_name } = req.body;
    try {
        const existingBarber = await pool.query("SELECT * FROM barbers WHERE account_name = $1", [account_name]);
        if(existingBarber.rows.length > 0) {
            return res.status(400).json({ error: 'Barber already exists' });
        }else{
            const barbers = await pool.query("INSERT INTO barbers (name, user_id, location, barber_shop_name, expertise, phone_number, account_name) VALUES ($1, $2, $3, $4, $5, $6, $7)", [name, req.user.id, location, barber_shop_name, expertise, phone_number, account_name]);
            return res.status(200).json(barbers);
        }
    } catch (error) {
        console.error(error);
    }
});

//add a review
app.post('/review', authenticateToken, async (req, res) => {
    if(req.user.role !== 'customer') return res.status(403).json({error: "Invalid role"});
     const { barber_id, style, rating, review_text, image_url } = req.body;
     if (!barber_id || !style || !rating || !review_text) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }
    try {
        const review = await pool.query('INSERT INTO reviews (user_id, barber_id, style, rating, review_text, image_url) VALUES ($1, $2, $3, $4, $5, $6)', [req.user.id, barber_id, style, rating, review_text, image_url]);
        return res.status(201).json({ message: 'Review posted successfully', review });
    } catch (error) {
        return res.status(500).json({ error: 'Error posting review' });
    }
})


//see a particular barber reviews
app.get('/barbers/:id/reviews', async (req, res) => {
    const {id} = req.params;
    try {
        const result = await pool.query("SELECT * FROM reviews WHERE barber_id = $1", [id]);
        const review = result.rows[0];
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({error: "Failed to get reviews"})
    }
});

app.get('/user', authenticateToken, async (req, res) => {
    try {
        if (!req.user.id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        const result = user.rows[0];
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({error: "Failed to get user"})
    }
})

// search for a paricular barber or review by name or city
app.get('/search', async (req, res) => {
    const {q} = req.query;
    if (!q) {
        return res.status(400).json({ error: 'Query parameter is missing' });
    }
    try {
        const barbers = await pool.query("SELECT * FROM barbers WHERE name ILIKE $1 OR location ILIKE $1", [q]);
        const reviews = await pool.query("SELECT * FROM reviews WHERE style ILIKE $1", [q]);
        res.status(200).json({ barbers: barbers.rows, reviews: reviews.rows });
    } catch (error) {
        res.status(500).json({error: "Failed to get barber or review"})
    }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// I made it very detailed because of cozmo since she isn't familair with node