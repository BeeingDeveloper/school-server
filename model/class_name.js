const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the class data will be stored)
const classSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

const Class = mongoose.model('class', classSchema);
module.exports = Class;