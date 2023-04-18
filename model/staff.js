const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the staff data will be stored)
const staffSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    message_heading: {
        type: String,
        required: true
    },
    message_description: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Staff = mongoose.model('staff', staffSchema);
module.exports = Staff;