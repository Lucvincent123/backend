const express = require("express")


const User = require("../database/models/user")

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        console.log("hello")
        const users = await User.find({})
        console.log(users)
        res.status(200).json({ success: true, data: users})
    } catch (error) {
        console.error("Error in Fetching User: ", error);
        res.status(500).json({ success: false, message: "Server error"})
    }
})

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
        console.error("Error in Create User: ", error);
        res.status(500).json({ success: false, message: "Server error"})
    }
})




module.exports = router