const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the student data will be stored)
const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    roll_number: {
        type: String,
        required: true
    },
    class_name: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Student = mongoose.model('student', studentSchema);
module.exports = Student;