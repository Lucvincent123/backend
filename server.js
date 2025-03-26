require("dotenv").config()

const express = require('express');
const connectDB = require("./database/connect");

const userRouter = require("./routes/user.route")



const app = express();

app.use(express.json())

// Define a route
app.get('/api', (req, res) => {
    res.send('Welcome to the Express.js Tutorial');
});

app.use("/api/users", userRouter)


// Start the server
app.listen(5000, () => {
    connectDB(process.env.MONGO_URI);
    console.log('Server is running on http://localhost:5000');
});