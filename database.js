const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Define the path for the data directory
const dataDir = path.join(__dirname, 'data');

// Create the data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Connect to the database file
const db = new sqlite3.Database(path.join(dataDir, 'expenses.db'), (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the expenses.db SQLite database.');
});

// Create the necessary tables
db.serialize(() => {
    console.log('Creating tables...');
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employeeId INTEGER,
        amount REAL,
        category TEXT,
        description TEXT,
        date TEXT,
        status TEXT,
        FOREIGN KEY (employeeId) REFERENCES users (id)
    )`);
    console.log('Tables created successfully.');
});

module.exports = db;