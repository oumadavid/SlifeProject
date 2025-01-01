const express = require('express');
const cors = require('cors');
const db = require('./db'); // Centralized database connection
const authRoutes = require('./routes/auth');
const path = require('path');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Serve static files (like the dashboard HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Test database connection
db.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Exit if the database connection fails
    } else {
        console.log('Connected to MySQL database');
    }
});

// Routes
app.use('/api/auth', authRoutes);

// Catch-all route for serving the dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Server configuration
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
