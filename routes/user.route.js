const express = require("express")


const User = require("../database/models/user")

const router = express.Router();

router.post("/", async (req, res) => {
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




module.exports = router