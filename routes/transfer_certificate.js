const express = require("express");
const router = express.Router();

const TransferCertificate = require("../model/transfer_certificate");
const fetchUser = require("../middleware/fetchUser");



// CREATE NEW TC REQUEST=======================================================================================
router.post('/create', async(req, res)=>{
    let { name, email, mobile, admission_number, mode } = req.body;

    const newTC = new TransferCertificate({
        name, email, mobile, admission_number, mode
    });

    try {
        const savedTC = await newTC.save();
        return res.status(200).send({success: true, data: savedTC});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO CREATE TC REQUEST"});
    }
})
//==============================================================================================================










// FETCH TC REQUEST=============================================================================================
router.get('/all-tc', async(req, res)=>{


    try {
        const savedTC = await TransferCertificate.find();
        return res.status(200).send({success: true, data: savedTC});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO CREATE TC REQUEST"});
    }
})
//==============================================================================================================









// DELETE TC REQUEST=============================================================================================
router.delete('/delete/:id', async(req, res)=>{

    const id = {_id: req.params.id};

    try {
        const savedTC = await TransferCertificate.findByIdAndDelete(id)
        return res.status(200).send({success: true, data: savedTC});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO DELETE TC REQUEST"});
    }
})
//==============================================================================================================








// // ROUTE 1 - Create a TC request with endpoint (POST : '/tc/create').
// router.post("/create", async (req, res) => {
//     let { name, email, mobile, admission_number, mode } = req.body;

//     try {
//         if (!name || !email || !mobile || !admission_number || !mode)
//             return res.status(400).json({
//                 type: "error",
//                 message: "Please fill all the fields."
//             });

//         await TransferCertificate.create({
//             name,
//             email,
//             mobile,
//             admission_number,
//             mode
//         });

//         res.status(200).json({
//             type: "success",
//             message: "TC Requested successfully."
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             type: "error",
//             message: "Something went wrong."
//         });
//     }
// });

// // ROUTE 2 - Get all TC request with endpoint (POST : '/tc/all')
// router.post('/all', fetchUser, async (req, res) => {
//     try {
//         if (req.user.type !== "school" && req.user.type !== "admin")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         const details = await TransferCertificate.find();
//         if (details.length === 0)
//             return res.status(200).json({
//                 type: "success",
//                 message: "No details found.",
//                 data: []
//             });

//         res.status(200).json({
//             type: "success",
//             message: "TC requests fetched successfully.",
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

// // ROUTE 3 - Get the TC request from ID with endpoint (POST : '/tc/:id')
// router.post('/:id', fetchUser, async (req, res) => {
//     try {
//         if (req.user.type !== "school" && req.user.type !== "admin")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         const details = await TransferCertificate.findById(req.params.id);
//         if (!details)
//             return res.status(404).json({
//                 type: "error",
//                 message: "Details not found."
//             });

//         res.status(200).json({
//             type: "success",
//             message: "TC requests fetched successfully.",
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

// // ROUTE 4 - Delete the TC request with endpoint (DELETE : '/tc/:id')
// router.delete('/:id', fetchUser, async (req, res) => {
//     try {
//         if (req.user.type !== "school" && req.user.type !== "admin")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         let del = await TransferCertificate.findByIdAndDelete(req.params.id);
//         if (!del)
//             return res.status(404).json({
//                 type: "error",
//                 message: "Details not found."
//             });

//         res.status(200).json({
//             type: "success",
//             message: "TC Request deleted successfully."
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