/*const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../DataBase'); // Ensure you are using the correct path to your DataBase.js

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = rows[0];

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // If credentials are valid, you can send a success response
        res.json({ message: 'Login successful', user: { username: user.username, email: user.email } });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;*/
