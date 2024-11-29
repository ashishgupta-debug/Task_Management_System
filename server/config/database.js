const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize the SQLite database connection
const db = new sqlite3.Database(path.resolve(__dirname, './tasks.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    // Create the tasks table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        due_date TEXT NOT NULL,
        status TEXT DEFAULT 'Pending'
      )`,
      (err) => {
        if (err) {
          console.error('Error creating tasks table:', err.message);
        } else {
          console.log('Tasks table created or already exists.');
        }
      }
    );
  }
});

module.exports = db;

