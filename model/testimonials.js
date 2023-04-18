const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the testimonial data will be stored)
const testimonialSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
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

const Testimonial = mongoose.model('testimonial', testimonialSchema);
module.exports = Testimonial;