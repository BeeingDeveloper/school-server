const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the about data will be stored)
const aboutSchema = new Schema({
    about_heading: {
        type: String,
        required: true
    },
    about_text: {
        type: String,
        required: true
    },
    students: {
        type: String,
        required: true
    },
    teachers: {
        type: String,
        required: true
    },
    classes: {
        type: String,
        required: true
    },
    board: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const About = mongoose.model('about', aboutSchema);
module.exports = About;