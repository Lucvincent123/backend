const jwt = require("jsonwebtoken");

const express = require("express")


const User = require("../database/models/user")

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find({})
        console.log(users)
        res.status(200).json({ success: true, data: users})
    } catch (error) {
        console.error("Error in Fetching User: ", error);
        res.status(500).json({ success: false, message: "Server error"})
    }
})

const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Champs requis" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Erreur création user :", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Champs requis" });
    }
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ success: false, message: "Identifiants invalides" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Mot de passe incorrect" });
      }
  
      // Générer le token JWT
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({ success: true, token });
    } catch (error) {
      console.error("Erreur de connexion :", error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  });
  




module.exports = router