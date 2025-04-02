require("dotenv").config();
const express = require('express');
const cors = require("cors");
const connectDB = require("./database/connect");

const userRouter = require("./routes/user.route");
const eventRouter = require("./routes/event.route"); // Ajouter cette ligne pour les événements

const app = express();

app.use(express.json());
app.use(cors());

// Define routes
app.get('/api', (req, res) => {
    res.send('Welcome to the Express.js Tutorial');
});

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter); // Ajouter cette route

// Start the server
app.listen(5000, () => {
    connectDB(process.env.MONGO_URI);
    console.log('Server is running on http://localhost:5000');
});
