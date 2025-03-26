require("dotenv").config()

const express = require('express');
const connectDB = require("./database/connect");

const User = require("./database/models/user")

const app = express();

app.use(express.json())

// Define a route
app.get('/', (req, res) => {
    res.send('Welcome to the Express.js Tutorial');
});

app.post("/users", async (req, res) => {
    const user = req.body;

    if (!user.username || !user.password) {
        return res.status(400).json({ success: false, message: "Please provide all fields" })
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser })
    } catch (error) {
        console.error("Error in Create Product: ", error);
        res.status(500).json({ success: false, message: "Server error"})
    }
})


// Start the server
app.listen(5000, () => {
    connectDB(process.env.MONGO_URI);
    console.log('Server is running on http://localhost:5000');
});