const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./userDatabase");

const router = express.Router();
const SECRET_KEY = "your_secret_key"; // Change this in production

//alskdj
router.post("/signup", async (req, res) => {
    try {
        const { name, email, phone, username, password } = req.body;
        console.log(name,email,phone,username,password);

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        // Create new user
        const user = new User({ name, email, phone, username, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

module.exports = router;
