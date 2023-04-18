const express = require("express");
const router = express.Router();

const Staff = require("../model/staff");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1 - Create a staff with endpoint (POST : '/staff/create').

//CREATE NEW STAFF=======================================================================
router.post('/create', async(req, res)=>{
    let { name, image, designation, message_heading, message_description } = req.body;

    const newStaff = new Staff({
        name, image, designation, message_heading, message_description
    });

    try {
        const savedStaff = await newStaff.save();
        return res.status(200).send({success: true, data: savedStaff});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO CREATE NEW STAFF"});
    }

})
//========================================================================================








//FETCH ALL STAFF =======================================================================
router.get('/fetch-all', async(req, res)=>{


    try {
        const allStaff = await Staff.find();
        return res.status(200).send({success: true, data: allStaff});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO FETCH STAFF DATA"});
    }

})
//========================================================================================







//DELETE STAFF BY ID======================================================================
router.delete('/delete/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const deletedItem = await Staff.findByIdAndDelete(id);
        return res.status(200).send({success: true, data: deletedItem});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILD TO DELETE STAFF DATA"});
    }

})


// router.post("/create", fetchUser, async (req, res) => {
//     let { name, image, designation, message_heading, message_description } = req.body;

//     try {
//         if (req.user.type === "admin" && req.user.type === "school")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         if (!name || !image || !designation || !message_heading || !message_description)
//             return res.status(400).json({
//                 type: "error",
//                 message: "Please fill all the fields."
//             });

//         await Staff.create({
//             name,
//             image,
//             designation,
//             message_heading,
//             message_description
//         });

//         res.status(200).json({
//             type: "success",
//             message: "Staff added successfully."
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             type: "error",
//             message: "Something went wrong."
//         });
//     }
// });

// ROUTE 2 - Get all staff details with endpoint (POST : '/staff/all')
router.get('/all', async (req, res) => {
    try {
        const details = await Staff.find();
        if (details.length === 0)
            return res.status(200).json({
                type: "success",
                message: "No staff found.",
                data: []
            });

        res.status(200).json({
            type: "success",
            message: "Staff details fetched successfully.",
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

// ROUTE 3 - Get the staff from ID with endpoint (POST : '/staff/:id')
router.get('/:id', async (req, res) => {
    try {
        const details = await Staff.findById(req.params.id);
        if (!details)
            return res.status(404).json({
                type: "error",
                message: "Staff not found."
            });

        res.status(200).json({
            type: "success",
            message: "Staff details fetched successfully.",
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

// ROUTE 4 - Update the staff with endpoint (PUT : '/staff/update/:id')
router.put('/update/:id', fetchUser, async (req, res) => {
    try {
        const { name, image, designation, message_heading, message_description } = req.body;

        if (req.user.type !== "admin" && req.user.type !== "school")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        const existing = await Staff.findById(req.params.id);
        if (!existing)
            return res.status(404).json({
                type: "error",
                message: "Staff not found."
            });

        if (!name || !image || !designation || !message_heading || !message_description)
            return res.status(400).json({
                type: "error",
                message: "Please enter a valid data."
            });

        let st = await Staff.findByIdAndUpdate(req.params.id, {
            name: name || existing.name,
            image: image || existing.image,
            designation: designation || existing.designation,
            message_heading: message_heading || existing.message_heading,
            message_description: message_description || existing.message_description
        }, { new: true });

        if (!st)
            return res.status(404).json({
                type: "error",
                message: "Staff not found."
            });

        res.status(200).json({
            type: "success",
            message: "Staff updated successfully.",
            data: st
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            type: "error",
            message: "Something went wrong."
        });
    }
});

// ROUTE 5 - Delete the staff with endpoint (DELETE : '/staff/:id')
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        if (req.user.type !== "school" && req.user.type !== "admin")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        let del = await Staff.findByIdAndDelete(req.params.id);
        if (!del)
            return res.status(404).json({
                type: "error",
                message: "Staff not found."
            });

        res.status(200).json({
            type: "success",
            message: "Staff deleted successfully."
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