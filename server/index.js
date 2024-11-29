const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const taskRoutes = require("./routes/taskRoute");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tasks.db",(error) => {
    if(error) {
        console.error('"Error opening database: ', error.message);
    }
    else{
        console.log("connected to SQLite database");
    }
});

// Loading environment variable from .env file
dotenv.config(); 

// Setting up port number
const PORT = process.env.PORT || 4000;


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors()
);


// Setting up routes
app.use("/api/v1/task", taskRoutes);

// Testing the server
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ..."
    });
});

// Listening to the server
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})