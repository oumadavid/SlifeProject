const express = require('express');
const bcrypt = require('bcrypt'); // For hashing passwords
const db = require('../db'); // Import the centralized database connection

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error occurred while checking user', error: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user
            const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error occurred during registration', error: err });
                }

                res.status(201).json({ message: 'User registered successfully' });
            });
        } catch (hashErr) {
            return res.status(500).json({ message: 'Error hashing password', error: hashErr });
        }
    });
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const findUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(findUserQuery, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error occurred while finding user', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];

        try {
            // Validate the password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Redirect to the dashboard page
            res.status(200).json({
                message: 'Login successful',
                username: user.username,
                redirectUrl: '/dashboard',
            });
        } catch (compareErr) {
            return res.status(500).json({ message: 'Error validating password', error: compareErr });
        }
    });
});

module.exports = router;
