const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the tc data will be stored)
const transfer_certificateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    admission_number: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const TransferCertificate = mongoose.model('transfer_certificate', transfer_certificateSchema);
module.exports = TransferCertificate;