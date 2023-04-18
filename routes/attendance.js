const express = require("express");
const router = express.Router();

const Attendance = require("../model/attendance");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1 - Update attendace with endpoint (POST : '/attendance/update').



router.put("/update", fetchUser, async (req, res) => {
    let { date, student_id, status } = req.body;

    try {
        if (req.user.type === "admin" && req.user.type === "school")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        if (date.length === 0 || student_id.length === 0 || status.length === 0 || date.length !== student_id.length || student_id.length !== status.length)
            return res.status(400).json({
                type: "error",
                message: "Please fill all the fields."
            });


        for (let i = 0; i < student_id.length; i++) {
            let exist = await Attendance.findOne({ date: date[i], student_id: student_id[i] });
            if (!exist) {
                await Attendance.create({
                    date: date[i],
                    student_id: student_id[i],
                    status: status[i]
                })
            } else {
                await Attendance.findByIdAndUpdate(exist._id, {
                    date: date[i],
                    student_id: student_id[i],
                    status: status[i]
                })
            }
        }

        res.status(200).json({
            type: "success",
            message: "Attendance updated successfully."
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            type: "error",
            message: "Something went wrong."
        });
    }
});

// ROUTE 2 - Get all attendance with endpoint (POST : '/attendance/all')
router.get('/all', async (req, res) => {
    try {

        const details = await Attendance.find();
        if (details.length === 0)
            return res.status(200).json({
                type: "success",
                message: "No attendance found.",
                data: []
            });

        res.status(200).json({
            type: "success",
            message: "Attendance fetched successfully.",
            data: details
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            type: "error",
            message: "Something went wrong."
        });
    }
});

module.exports = router;