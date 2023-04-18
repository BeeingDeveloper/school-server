const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/connectDB");
dotenv.config();



const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

connectDB();

app.get("/", (req, res) => {
    res.send("School Management System API");
});

app.use("/api/auth", require("./routes/auth"));

app.use("/api/contact", require("./routes/contact"));

app.use("/api/tc", require("./routes/transfer_certificate"));

app.use("/api/notice", require("./routes/notice"));

app.use("/api/admission", require("./routes/admission"));

app.use("/api/payment", require("./routes/payment"));

app.use("/api/gallery", require("./routes/gallery"));

app.use("/api/testimonials", require("./routes/testimonials"));

app.use("/api/about", require("./routes/about"));

app.use("/api/staff", require("./routes/staff"));

app.use("/api/footer", require("./routes/footer"));

app.use("/api/student", require("./routes/student"));

app.use("/api/attendance", require("./routes/attendance"));

app.use("/api/calendar", require("./routes/calendar"));

app.use("/api/class", require("./routes/class_name"));

app.listen(port, () => {
    console.log(`Server running`);
});

module.exports = app;