const express = require("express");
const router = express.Router();

const Notice = require("../model/notice");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1 - Create a Notice with endpoint (POST : '/notice/create').



// CREATE NEW NOTICE------------------------------------------------------------------------------------
router.post('/create', async(req, res)=>{
    let {name, description, type, date} = req.body;

    const newNotice = new Notice({
        name, description, type, date
    });

    try {
        const savedNotice = await newNotice.save();
        return res.status(200).send({success: true, data: savedNotice});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO CREATE NEW NOTICE"})
    }
});
//-----------------------------------------------------------------------------------------------------






// router.post("/create", fetchUser, async (req, res) => {
//     let { name, description, type, date, month } = req.body;

//     try {
//         if (req.user.type === "admin" && req.user.type === "school")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         if (!name || !description || !type || !date || !month)
//             return res.status(400).json({
//                 type: "error",
//                 message: "Please fill all the fields."
//             });

//         await Notice.create({
//             name,
//             description,
//             type,
//             date,
//             month
//         });

//         res.status(200).json({
//             type: "success",
//             message: "Notice created successfully."
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             type: "error",
//             message: "Something went wrong."
//         });
//     }
// });

// ROUTE 2 - Get all notices with endpoint (POST : '/notice/all')




// FETCH ALL NOTICE------------------------------------------------------------------------------------
router.get('/all-notice', async(req, res)=>{

    try {
        const allNotice = await Notice.find();
        return res.status(200).send({success: true, data: allNotice});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILD TO LOAD ALL NOTICE"});
    }
});
//-----------------------------------------------------------------------------------------------------



// router.get('/all', async (req, res) => {
//     try {

//         const details = await Notice.find();
//         if (details.length === 0)
//             return res.status(200).json({
//                 type: "success",
//                 message: "No notices found.",
//                 data: []
//             });

//         res.status(200).json({
//             type: "success",
//             message: "Notices fetched successfully.",
//             data: details
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             type: "error",
//             message: "Something went wrong."
//         });
//     }
// });

// ROUTE 3 - Get the notice detail from ID with endpoint (POST : '/notice/:id')



// FETCH NOTICE BY ID-----------------------------------------------------------------------------------
router.get('/all-notice/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const singleNotice = await Notice.findById(id);
        return res.status(200).send({success: true, data: singleNotice});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO FIND THE NOTICE"});
    }
});
//-----------------------------------------------------------------------------------------------------





// router.get('/:id', async (req, res) => {
//     try {
//         const details = await Notice.findById(req.params.id);
//         if (!details)
//             return res.status(404).json({
//                 type: "error",
//                 message: "Notice not found."
//             });

//         res.status(200).json({
//             type: "success",
//             message: "Notice fetched successfully.",
//             data: details
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             type: "error",
//             message: "Something went wrong."
//         });
//     }
// });

// ROUTE 4 - Update the notice details with endpoint (PUT : '/notice/update/:id')



// UPDATE NOTICE BY ID-----------------------------------------------------------------------------------
router.put('/update/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    let {name, description, type, date} = req.body;

    const newNotice = {
        name, description, type, date
    };


    try {
        const updatedNotice = await Notice.findByIdAndUpdate(id, newNotice);
        return res.status(200).send({success: true, data: updatedNotice});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO UPDATE THE NOTICE"});
    }
});
//-------------------------------------------------------------------------------------------------------







// router.put('/update/:id', fetchUser, async (req, res) => {
//     try {
//         const { name, description, type, date, month } = req.body;

//         if (req.user.type !== "admin" && req.user.type !== "school")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         const existingNotice = await Notice.findById(req.params.id);
//         if (!existingNotice)
//             return res.status(404).json({
//                 type: "error",
//                 message: "Notice not found."
//             });

//         if (!name && !description && !type && !date && !month)
//             return res.status(400).json({
//                 type: "error",
//                 message: "Please enter a valid data."
//             });

//         let notice = await Notice.findByIdAndUpdate(req.params.id, {
//             name: name ? name : existingNotice.name,
//             description: description ? description : existingNotice.description,
//             type: type ? type : existingNotice.type,
//             date: date ? date : existingNotice.date,
//             month: month ? month : existingNotice.month
//         }, { new: true });

//         if (!notice)
//             return res.status(404).json({
//                 type: "error",
//                 message: "Notice not found."
//             });

//         res.status(200).json({
//             type: "success",
//             message: "Notice updated successfully.",
//             data: notice
//         });

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             type: "error",
//             message: "Something went wrong."
//         });
//     }
// });

// ROUTE 5 - Delete the notice with endpoint (DELETE : '/notice/:id')


// DELETE NOTICE BY ID-----------------------------------------------------------------------------------
router.delete('/delete/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const deletedNotice = await Notice.findByIdAndDelete(id);
        return res.status(200).send({success: true, data: deletedNotice});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO DELETE NOTICE"});
    }
});
//--------------------------------------------------------------------------------------------------------







// router.delete('/:id', fetchUser, async (req, res) => {
//     try {
//         if (req.user.type !== "school" && req.user.type !== "admin")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         let del = await Notice.findByIdAndDelete(req.params.id);
//         if (!del)
//             return res.status(404).json({
//                 type: "error",
//                 message: "Notice not found."
//             });

//         res.status(200).json({
//             type: "success",
//             message: "Notice deleted successfully."
//         });

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             type: "error",
//             message: "Something went wrong."
//         });
//     }
// });

module.exports = router;