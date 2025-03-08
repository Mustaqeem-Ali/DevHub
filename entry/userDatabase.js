const mongoose = require("mongoose")

// const database = mongoose.connect('mongodb+srv://mustaqeemali6764:uqiRtrDo3ASlHMmd@cluster0.zcxgj.mongodb.net/')

const LoginCredentials = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, { timestamps: true }); // Adds createdAt & updatedAt fields

const signup = mongoose.model("signups", LoginCredentials);
module.exports = signup;
