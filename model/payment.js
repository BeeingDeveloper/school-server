const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the payment data will be stored)
const paymentSchema = new Schema({
    name: {
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
    installment: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    proof: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('payment', paymentSchema);
module.exports = Payment;