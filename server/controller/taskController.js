const db = require('../config/database');


// Method for Create a Task
exports.createTask = async (req, res) => {
  try {
    let {
      title,
      description,
      due_date,
      status
    } = req.body

    // Check if any required fields are missing
    if (
      !title ||
      !due_date
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are Mendatory",
      })
    }

    // Create a new task with the given details
    const query = `INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)`;
    db.run(query, [title, description, due_date], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
};

// Method to Get all Task
exports.getTasks = (req, res) => {
  const query = `SELECT * FROM tasks`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
};

// Method to Update a task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;

  const query = `UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?`;
  db.run(query, [title, description, due_date, status, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.status(200).json({ message: 'Task updated successfully.' });
  });
};


// Method to delete Task
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM tasks WHERE id = ?`;
  console.log('Attempting to delete task with id:', id);
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.status(200).json({ message: 'Task deleted successfully.' });
  });
};
