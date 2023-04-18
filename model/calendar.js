const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the calendar data will be stored)
const calendarSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Calendar = mongoose.model('calendar', calendarSchema);
module.exports = Calendar;