const express = require("express");
const router = express.Router();

const Gallery = require("../model/gallery");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1 - Create a Event with endpoint (POST : '/gallery/create').




// CREATE NEW IMAGE---------------------------------------------------------------------
router.post('/create', async(req, res)=>{
    
    let {title, image, event_date} = req.body;
    
    const newImageData = new Gallery({
        title , image, event_date
    });

    try {
        const savedImage = await newImageData.save();
        return res.status(200).send({success: true, data: savedImage});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO ADD NEW IMAGE"});
    }
})
//---------------------------------------------------------------------------------------









// FETCH ALL GALLERY ITEMS----------------------------------------------------------------
router.get('/fetch-all', async(req, res)=>{
    try {
        const galleryItems = await Gallery.find();
        return res.status(200).send({success: true, data: galleryItems});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO FETCH GALLERY INFORMATIONS"});
    }
});
//-----------------------------------------------------------------------------------------









router.delete('/delete/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const deltedItem = await Gallery.findByIdAndDelete(id);
        return res.status(200).send({success: true, data: deltedItem});
    } catch (error) {
        return res.status(400).send({success: false, data: 'FAILED TO DELETE ITEM'});
    }
});



// router.post("/create", fetchUser, async (req, res) => {
//     let { title, image, event_date, created_date } = req.body;

//     try {
//         if (req.user.type === "admin" && req.user.type === "school")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         if (!title || !image || !event_date || !created_date)
//             return res.status(400).json({
//                 type: "error",
//                 message: "Please fill all the fields."
//             });

//         await Gallery.create({
//             title,
//             image,
//             event_date,
//             created_date
//         });

//         res.status(200).json({
//             type: "success",
//             message: "Event created successfully."
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             type: "error",
//             message: "Something went wrong."
//         });
//     }
// });

// ROUTE 2 - Get all events with endpoint (POST : '/gallery/all')
router.get('/all', async (req, res) => {
    try {
        const details = await Gallery.find();
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

// ROUTE 3 - Get the event detail from ID with endpoint (POST : '/gallery/:id')
router.get('/:id', async (req, res) => {
    try {
        const details = await Gallery.findById(req.params.id);
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

// ROUTE 4 - Update the event details with endpoint (PUT : '/gallery/update/:id')
router.put('/update/:id', fetchUser, async (req, res) => {
    try {
        const { title, image, event_date, created_date } = req.body;

        if (req.user.type !== "admin" && req.user.type !== "school")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        const existingEvent = await Gallery.findById(req.params.id);
        if (!existingEvent)
            return res.status(404).json({
                type: "error",
                message: "Event not found."
            });

        if (!title || !image || !event_date || !created_date)
            return res.status(400).json({
                type: "error",
                message: "Please enter a valid data."
            });

        let event = await Gallery.findByIdAndUpdate(req.params.id, {
            title: title || existingEvent.title,
            image: image || existingEvent.image,
            event_date: event_date || existingEvent.event_date,
            created_date: created_date || existingEvent.created_date
        }, { new: true });

        if (!event)
            return res.status(404).json({
                type: "error",
                message: "Event not found."
            });

        res.status(200).json({
            type: "success",
            message: "Event updated successfully.",
            data: event
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            type: "error",
            message: "Something went wrong."
        });
    }
});

// ROUTE 5 - Delete the event with endpoint (DELETE : '/gallery/:id')
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        if (req.user.type !== "school" && req.user.type !== "admin")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        let del = await Gallery.findByIdAndDelete(req.params.id);
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