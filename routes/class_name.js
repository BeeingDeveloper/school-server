const express = require("express");
const router = express.Router();

const Class = require("../model/class_name");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1 - Create a class with endpoint (POST : '/class/create').




// CREATE NEW CLASS---------------------------------------------------------------------------------------
router.post('/create', async(req, res)=>{
    let {name, section} = req.body;

    const newClass = new Class({
        name, section
    })

    try {
        const savedClass = await newClass.save();
        return res.status(200).send({success: true, data: savedClass});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO CREATE NEW CLASS"});
    }
});
//--------------------------------------------------------------------------------------------------------









// router.post("/create", fetchUser, async (req, res) => {
//     let { name, section } = req.body;

//     try {
//         if (req.user.type === "admin" && req.user.type === "school")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         if (!name || !section)
//             return res.status(400).json({
//                 type: "error",
//                 message: "Please fill all the fields."
//             });

//         let exist = await Class.findOne({ name, section });
//         if (exist !== null)
//             return res.status(409).json({
//                 type: "error",
//                 message: "Class already exists."
//             });

//         await Class.create({
//             name,
//             section
//         });

//         res.status(200).json({
//             type: "success",
//             message: "Class added successfully."
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             type: "error",
//             message: "Something went wrong."
//         });
//     }
// });

// ROUTE 2 - Get all class with endpoint (POST : '/class/all')






// FETCH ALL CLASS---------------------------------------------------------------------------------------
router.get('/all-class', async(req, res)=>{

    try {
        const allClass = await Class.find();
        return res.status(200).send({success: true, data: allClass});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO LOAD ALL CLASSES"});
    }
});
//-------------------------------------------------------------------------------------------------------







// router.get('/all', async (req, res) => {
//     try {

//         const details = await Class.find();
//         if (details.length === 0)
//             return res.status(200).json({
//                 type: "success",
//                 message: "No class found.",
//                 data: []
//             });

//         res.status(200).json({
//             type: "success",
//             message: "Classes fetched successfully.",
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

// ROUTE 3 - Get the class detail from ID with endpoint (POST : '/class/:id')


//  FETCH CLASS BY ID------------------------------------------------------------------------------------
router.get('/all-class/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const fetchedClass = Class.findById(id);
        return res.status(200).send({success: true, data: fetchedClass});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO LOAD THE CLASS"});
    }
});
//-------------------------------------------------------------------------------------------------------


// router.get('/:id', async (req, res) => {
//     try {
//         const details = await Class.findById(req.params.id);
//         if (!details)
//             return res.status(404).json({
//                 type: "error",
//                 message: "Class not found."
//             });

//         res.status(200).json({
//             type: "success",
//             message: "Class fetched successfully.",
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

// ROUTE 4 - Update the class details with endpoint (PUT : '/class/update/:id')




// UPDATE CLASS BY ID------------------------------------------------------------------------------------
router.put('/update/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const updatedClass = Class.findByIdAndUpdate(id);
        return res.status(200).send({success: true, data: updatedClass});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO UPDATE CLASS"});
    }
});
//-------------------------------------------------------------------------------------------------------









// router.put('/update/:id', fetchUser, async (req, res) => {
//     try {
//         const { name, section } = req.body;

//         if (req.user.type !== "admin" && req.user.type !== "school")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         const existing = await Class.findById(req.params.id);
//         if (!existing)
//             return res.status(404).json({
//                 type: "error",
//                 message: "Class not found."
//             });

//         if (!name || !section)
//             return res.status(400).json({
//                 type: "error",
//                 message: "Please enter a valid data."
//             });

//         let exist = await Class.findOne({ name, section });
//         if (exist !== null)
//             return res.status(409).json({
//                 type: "error",
//                 message: "Class already exists."
//             });

//         let details = await Class.findByIdAndUpdate(req.params.id, {
//             name: name || existing.name,
//             section: section || existing.section
//         }, { new: true });

//         if (!details)
//             return res.status(404).json({
//                 type: "error",
//                 message: "Class not found."
//             });

//         res.status(200).json({
//             type: "success",
//             message: "Class updated successfully.",
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

// ROUTE 5 - Delete the class with endpoint (DELETE : '/class/:id')






// DELETE CLASS BY ID------------------------------------------------------------------------------------
router.delete('/delete/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const deletedClass = await Class.findByIdAndDelete(id);
        return res.status(200).send({success: true, data: deletedClass});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO DELETE THE CLASS"});
    }
});
//-------------------------------------------------------------------------------------------------------



// router.delete('/:id', fetchUser, async (req, res) => {
//     try {
//         if (req.user.type !== "school" && req.user.type !== "admin")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         let del = await Class.findByIdAndDelete(req.params.id);
//         if (!del)
//             return res.status(404).json({
//                 type: "error",
//                 message: "Class not found."
//             });

//         res.status(200).json({
//             type: "success",
//             message: "Class deleted successfully."
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