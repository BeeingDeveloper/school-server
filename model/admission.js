const mongoose = require('mongoose');
const { Schema } = mongoose;

// Declare the schema (how the admission data will be stored)
const admissionSchema = new Schema({
    name: { type: String, required: true},

    address: { type: String, required: true },

    city: {type: String,required: true },

    state: { type: String, required: true },

    pincode: { type: String, required: true },

    email: { type: String, required: true },

    mobile: { type: String, required: true },

    gender: { type: String, required: true},

    dob: { type: String, required: true },

    previous_school: { type: String, required: true },

    last_grade: { type: String, required: true },

    new_grade: { type: String, required: true },

    parent_name: { type: String, required: true },

    parent_occupation: { type: String, required: true },

    parent_income: { type: String, required: true },
    
    parent_relationship: { type: String, required: true },
    
    expelled: {  type: String },
    
    birth_certificate: { type: String, required: true },
    
    previous_report_card: { type: String, required: true },
    
    transfer_certificate: { type: String, required: true},
    
    photo: { type: String, required: true},
    
    residence_proof: { type: String, required: true},
    
    income_proof: {type: String },
    
    other: {type: String },
    

},
{
    timestamps: true
});

const Admission = mongoose.model('admission', admissionSchema);
module.exports = Admission;