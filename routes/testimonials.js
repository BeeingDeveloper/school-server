const express = require("express");
const router = express.Router();

const Testimonial = require("../model/testimonials");
const fetchUser = require("../middleware/fetchUser");










// ROUTE 1 - Create a testimonial with endpoint (POST : '/testimonial/create').
router.post("/create", async (req, res) => {
    let { name, image, description } = req.body;

    try {
        if (req.user.type === "admin" && req.user.type === "school")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        if (!name || !image || !description)
            return res.status(400).json({
                type: "error",
                message: "Please fill all the fields."
            });

        await Testimonial.create({
            name,
            image,
            description
        });

        res.status(200).json({
            type: "success",
            message: "Testimonial created successfully."
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            type: "error",
            message: "Something went wrong."
        });
    }
});











// ROUTE 2 - Get all testimonials with endpoint (POST : '/testimonial/all')
router.get('/all', async (req, res) => {
    try {
        const details = await Testimonial.find();
        if (details.length === 0)
            return res.status(200).json({
                type: "success",
                message: "No testimonial found.",
                data: []
            });

        res.status(200).json({
            type: "success",
            message: "Testimonials fetched successfully.",
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











// ROUTE 3 - Get the testimonial from ID with endpoint (POST : '/testimonial/:id')
router.get('/:id', async (req, res) => {
    try {
        const details = await Testimonial.findById(req.params.id);
        if (!details)
            return res.status(404).json({
                type: "error",
                message: "Testimonial not found."
            });

        res.status(200).json({
            type: "success",
            message: "Testimonial fetched successfully.",
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









// ROUTE 4 - Update the testimonial with endpoint (PUT : '/testimonial/update/:id')
router.put('/update/:id', fetchUser, async (req, res) => {
    try {
        const { name, image, description } = req.body;

        if (req.user.type !== "admin" && req.user.type !== "school")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        const existing = await Testimonial.findById(req.params.id);
        if (!existing)
            return res.status(404).json({
                type: "error",
                message: "Testimonial not found."
            });

        if (!name && !image && !description)
            return res.status(400).json({
                type: "error",
                message: "Please enter a valid data."
            });

        let testimonial = await Testimonial.findByIdAndUpdate(req.params.id, {
            name: name || existing.name,
            image: image || existing.image,
            description: description || existing.description
        }, { new: true });

        if (!testimonial)
            return res.status(404).json({
                type: "error",
                message: "Testimonial not found."
            });

        res.status(200).json({
            type: "success",
            message: "Testimonial updated successfully.",
            data: testimonial
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            type: "error",
            message: "Something went wrong."
        });
    }
});









// ROUTE 5 - Delete the testimonial with endpoint (DELETE : '/testimonial/:id')
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        if (req.user.type !== "school" && req.user.type !== "admin")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        let del = await Testimonial.findByIdAndDelete(req.params.id);
        if (!del)
            return res.status(404).json({
                type: "error",
                message: "Testimonial not found."
            });

        res.status(200).json({
            type: "success",
            message: "Testimonial deleted successfully."
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