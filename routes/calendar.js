const express = require("express");
const router = express.Router();

const Calendar = require("../model/calendar");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1 - Create a Event with endpoint (POST : '/calendar/create').
router.post("/create", fetchUser, async (req, res) => {
    let { date, title, description } = req.body;

    try {
        if (req.user.type === "admin" && req.user.type === "school")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        if (!date || !title || !description)
            return res.status(400).json({
                type: "error",
                message: "Please fill all the fields."
            });

        await Calendar.create({
            date,
            title,
            description
        });

        res.status(200).json({
            type: "success",
            message: "Event created successfully."
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            type: "error",
            message: "Something went wrong."
        });
    }
});

// ROUTE 2 - Get all events with endpoint (POST : '/calendar/all')
router.get('/all', async (req, res) => {
    try {

        const details = await Calendar.find();
        if (details.length === 0)
            return res.status(200).json({
                type: "success",
                message: "No events found.",
                data: []
            });

        res.status(200).json({
            type: "success",
            message: "Events fetched successfully.",
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

// ROUTE 3 - Get the event detail from ID with endpoint (POST : '/calendar/:id')
router.get('/:id', async (req, res) => {
    try {
        const details = await Calendar.findById(req.params.id);
        if (!details)
            return res.status(404).json({
                type: "error",
                message: "Event not found."
            });

        res.status(200).json({
            type: "success",
            message: "Event fetched successfully.",
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

// ROUTE 4 - Update the event details with endpoint (PUT : '/calendar/update/:id')
router.put('/update/:id', fetchUser, async (req, res) => {
    try {
        const { date, title, description } = req.body;

        if (req.user.type !== "admin" && req.user.type !== "school")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        const existing = await Calendar.findById(req.params.id);
        if (!existing)
            return res.status(404).json({
                type: "error",
                message: "Event not found."
            });

        if (!date || !title || !description)
            return res.status(400).json({
                type: "error",
                message: "Please enter a valid data."
            });

        let detail = await Calendar.findByIdAndUpdate(req.params.id, {
            date: date ? date : existingNotice.date,
            title: title ? title : existingNotice.title,
            description: description ? description : existingNotice.description
        }, { new: true });

        if (!detail)
            return res.status(404).json({
                type: "error",
                message: "Event not found."
            });

        res.status(200).json({
            type: "success",
            message: "Event updated successfully.",
            data: detail
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            type: "error",
            message: "Something went wrong."
        });
    }
});

// ROUTE 5 - Delete the event with endpoint (DELETE : '/calendar/:id')
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        if (req.user.type !== "school" && req.user.type !== "admin")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        let del = await Calendar.findByIdAndDelete(req.params.id);
        if (!del)
            return res.status(404).json({
                type: "error",
                message: "Event not found."
            });

        res.status(200).json({
            type: "success",
            message: "Event deleted successfully."
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