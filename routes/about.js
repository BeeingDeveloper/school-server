const express = require("express");
const router = express.Router();

const About = require("../model/about");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1 - Get all about details with endpoint (POST : '/about/all')
router.get('/all', async (req, res) => {
    try {
        const details = await About.find();
        if (details.length === 0)
            return res.status(200).json({
                type: "success",
                message: "No details found.",
                data: []
            });

        res.status(200).json({
            type: "success",
            message: "About details fetched successfully.",
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

// ROUTE 2 - Update the about with endpoint (PUT : '/about/update')
router.put('/update', fetchUser, async (req, res) => {
    try {
        const { about_heading, about_text, students, teachers, classes, board } = req.body;

        if (req.user.type !== "admin" && req.user.type !== "school")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        if(!about_heading || !about_text || !students || !teachers || !classes || !board)
            return res.status(400).json({
                type: "error",
                message: "Please fill all the details"
            })

        const existing = await About.find();

        if (!existing.length) {
            await About.create({
                about_heading,
                about_text,
                students,
                teachers,
                classes,
                board
            });
        } else {
            await About.findByIdAndUpdate(existing[0]._id, {
                about_heading: about_heading || existing[0].about_heading,
                about_text: about_text || existing[0].about_text,
                students: students || existing[0].students,
                teachers: teachers || existing[0].teachers,
                classes: classes || existing[0].classes,
                board: board || existing[0].board
            }, { new: true });
        }

        return res.status(200).json({
            type: "success",
            message: "About details updated successfully."
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