const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the gallery data will be stored)
const gallerySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    event_date: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

const Gallery = mongoose.model('gallery', gallerySchema);
module.exports = Gallery;