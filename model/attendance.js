const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the attendance data will be stored)
const attendanceSchema = new Schema({
    date:{
        type: String,
        required: true
    },
    student_id: {
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "Absent"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Attendance = mongoose.model('attendance', attendanceSchema);
module.exports = Attendance;