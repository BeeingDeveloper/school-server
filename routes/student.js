const express = require("express");
const router = express.Router();

const Student = require("../model/student");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1 - Create a student with endpoint (POST : '/student/create').
router.post("/create", fetchUser, async (req, res) => {
    let { name, roll_number, class_name, section, mobile } = req.body;

    try {
        if (req.user.type === "admin" && req.user.type === "school")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        if (!name || !roll_number || !class_name || !section || !mobile)
            return res.status(400).json({
                type: "error",
                message: "Please fill all the fields."
            });

        let exist = await Student.findOne({ roll_number, class_name, section });
        if (exist !== null)
            return res.status(409).json({
                type: "error",
                message: "Roll number already used."
            });

        await Student.create({
            name,
            roll_number,
            class_name,
            section,
            mobile
        });

        res.status(200).json({
            type: "success",
            message: "Student added successfully."
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            type: "error",
            message: "Something went wrong."
        });
    }
});

// ROUTE 2 - Get all student with endpoint (POST : '/student/all')
router.get('/all', async (req, res) => {
    try {

        const details = await Student.find();
        if (details.length === 0)
            return res.status(200).json({
                type: "success",
                message: "No student found.",
                data: []
            });

        res.status(200).json({
            type: "success",
            message: "Students fetched successfully.",
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

// ROUTE 3 - Get the student detail from ID with endpoint (POST : '/student/:id')
router.get('/:id', async (req, res) => {
    try {
        const details = await Student.findById(req.params.id);
        if (!details)
            return res.status(404).json({
                type: "error",
                message: "Student not found."
            });

        res.status(200).json({
            type: "success",
            message: "Student fetched successfully.",
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

// ROUTE 4 - Update the student details with endpoint (PUT : '/student/update/:id')
router.put('/update/:id', fetchUser, async (req, res) => {
    try {
        const { name, roll_number, class_name, section, mobile } = req.body;

        if (req.user.type !== "admin" && req.user.type !== "school")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        const existing = await Student.findById(req.params.id);
        if (!existing)
            return res.status(404).json({
                type: "error",
                message: "Student not found."
            });

        if (!name || !roll_number || !class_name || !section || !mobile)
            return res.status(400).json({
                type: "error",
                message: "Please enter a valid data."
            });

        let exist = await Student.findOne({ roll_number, class_name, section });
        if (exist !== null)
            return res.status(409).json({
                type: "error",
                message: "Roll number already used."
            });

        let details = await Student.findByIdAndUpdate(req.params.id, {
            name: name || existing.name,
            roll_number: roll_number || existing.roll_number,
            class_name: class_name || existing.class_name,
            section: section || existing.section,
            mobile: mobile || existing.mobile
        }, { new: true });

        if (!details)
            return res.status(404).json({
                type: "error",
                message: "Student not found."
            });

        res.status(200).json({
            type: "success",
            message: "Student updated successfully.",
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

// ROUTE 5 - Delete the student with endpoint (DELETE : '/student/:id')
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        if (req.user.type !== "school" && req.user.type !== "admin")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        let del = await Student.findByIdAndDelete(req.params.id);
        if (!del)
            return res.status(404).json({
                type: "error",
                message: "Student not found."
            });

        res.status(200).json({
            type: "success",
            message: "Student deleted successfully."
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