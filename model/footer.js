const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the footer data will be stored)
const footerSchema = new Schema({
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    fax: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: true
    },
    youtube: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Footer = mongoose.model('footer', footerSchema);
module.exports = Footer;