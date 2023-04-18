const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the notice data will be stored)
const noticeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    // month: {
    //     type: String,
    //     required: true
    // },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Notice = mongoose.model('notice', noticeSchema);
module.exports = Notice;