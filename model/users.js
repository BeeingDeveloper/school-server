const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the user data will be stored)
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    type: {
        type: String,
        default: "school"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;