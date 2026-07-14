const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18, // for number only min and for string minLength
    },
    gender: {
        type: String,
    },
    photoUrl: {
        type: String,
    },
    about: {
        type: String,
        default: "This is default description of the user!",
    },
    skills: {
        type: [String],
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;