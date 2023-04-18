const mongoose = require('mongoose');
mongoose.set('strictQuery', false);




// Connect to the database
const connectDB = () => {
    try {
        mongoose.connect(process.env.ATLAS_URI, (err) => {
            if (err)
                return console.log(err);

            console.log("Connected to the database");
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;