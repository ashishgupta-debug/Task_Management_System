const express = require("express");
const router = express.Router();

// Import controller
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} = require("../controller/taskController")

// Route to create Task
router.post("/create", createTask)

// Route to get all Tasks
router.get("/get", getTasks)

// Route to update Task
router.put("/update/:id", updateTask)

// Route to delete Task
router.delete("/delete/:id", deleteTask)

// Export the router to use in the main application
module.exports = router