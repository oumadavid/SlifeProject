const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Daviddage@254',
    database: 'user_auth',
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit process if connection fails
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = db;
