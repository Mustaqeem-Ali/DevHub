const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./entry/authRoutes");
const cors = require('cors')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use("/auth", authRoutes);

// MongoDB Connection
mongoose.connect("mongodb+srv://mustaqeemali6764:uqiRtrDo3ASlHMmd@cluster0.zcxgj.mongodb.net/")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Connection Error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
