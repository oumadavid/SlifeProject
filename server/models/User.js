const bcrypt = require('bcrypt');
const db = require('../db'); // Import the centralized database connection

const User = {
    async createUser({ username, email, password }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            const values = [username, email, hashedPassword];
            return new Promise((resolve, reject) => {
                db.query(query, values, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async findUserByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    },

    async matchPassword(enteredPassword, storedPassword) {
        return bcrypt.compare(enteredPassword, storedPassword);
    }
};

module.exports = User;
