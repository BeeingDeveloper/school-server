const express = require("express");
const router = express.Router();

const Admission = require("../model/admission");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1 - Create a admission with endpoint (POST : '/admission/create').



// CREATE ADMISSION REQUEST-------------------------------------------------------------------------
router.post("/create", async (req, res) => {
    let { 
        name,
        address,
        city,
        state,
        pincode,
        email,
        mobile,
        gender,
        dob,
        previous_school,
        last_grade,
        new_grade,
        parent_name,
        parent_occupation,
        parent_income,
        parent_relationship,
        expelled,
        // medical,
        birth_certificate,
        previous_report_card,
        transfer_certificate,
        photo,
        residence_proof,
        income_proof,
        other
    } = req.body;


    const newAdmissionRequest = new Admission({
        name,
        address,
        city,
        state,
        pincode,
        email,
        mobile,
        gender,
        dob,
        previous_school,
        last_grade,
        new_grade,
        parent_name,
        parent_occupation,
        parent_income,
        parent_relationship,
        expelled,
        // medical,

        // DOCS
        birth_certificate,
        previous_report_card,
        transfer_certificate,
        photo,
        residence_proof,
        income_proof,
        other
    });


    try {
        // if (!name || !address || !address || !city || !state || !pincode || !email || !mobile || !gender || !dob || !previous_school || !last_grade || !new_grade || !parent_name || !parent_occupation || !parent_income || !parent_relationship || !birth_certificate || !previous_report_card || !transfer_certificate || !photo || !residence_proof)
        //     return res.status(400).json({
        //         type: "error",
        //         message: "Please fill all the fields."
        //     });

        // let ad = await Admission.create({
        //     name,
        //     address,
        //     city,
        //     state,
        //     pincode,
        //     email,
        //     mobile,
        //     gender,
        //     dob,
        //     previous_school,
        //     last_grade,
        //     new_grade,
        //     parent_name,
        //     parent_occupation,
        //     parent_income,
        //     parent_relationship,
        //     expelled,
        //     medical,
        //     birth_certificate,
        //     previous_report_card,
        //     transfer_certificate,
        //     photo,
        //     residence_proof,
        //     income_proof,
        //     other
        // });

        // if (ad)
        //     return res.status(200).json({
        //         type: "success",
        //         message: "Requested successfully."
        //     });
        // else
        //     return res.status(500).json({
        //         type: "error",
        //         message: "Error while Requesting."
        //     });

        const savedRequest = await newAdmissionRequest.save();
        return res.status(200).send({success: true, data: savedRequest});
    } catch (err) {
        // console.log(err);
        // res.status(500).json({
        //     type: "error",
        //     message: "Something went wrong."
        // });

        return res.status(501).send({success: false, msg: "FAILED TO SEND REQUEST"});
    }
});
//------------------------------------------------------------------------------------------------------










// FETCH ALL ADMISSION REQUESTS-------------------------------------------------------------------------
router.get('/all-requests', async(req, res)=>{

    try {
        const admissionRequests = await Admission.find();
        return res.status(200).send({success: true, data: admissionRequests});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO LOAD ALL ADMISSION REQUESTS"});
    }
});
//------------------------------------------------------------------------------------------------------




// router.post('/all', fetchUser, async (req, res) => {
//     try {
//         if (req.user.type !== "school" && req.user.type !== "admin")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         const details = await Admission.find();
//         if (details.length === 0)
//             return res.status(200).json({
//                 type: "success",
//                 message: "No details found.",
//                 data: []
//             });

//         res.status(200).json({
//             type: "success",
//             message: "Admission details fetched successfully.",
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

// ROUTE 3 - Get the admission request from ID with endpoint (POST : '/admission/:id')





// FIND REQUEST BY ID------------------------------------------------------------------------------------
router.get('/all-requests/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const singleRequest = await Admission.findById(id);
        return res.status(200).send({success: true, data: singleRequest});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO FIND THE REQUEST"});
    }
})
//-------------------------------------------------------------------------------------------------------



// router.post('/:id', fetchUser, async (req, res) => {
//     try {
//         if (req.user.type !== "school" && req.user.type !== "admin")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         const details = await Admission.findById(req.params.id);
//         if (!details)
//             return res.status(404).json({
//                 type: "error",
//                 message: "Details not found."
//             });

//         res.status(200).json({
//             type: "success",
//             message: "Admission details fetched successfully.",
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

// ROUTE 4 - Delete the admission request with endpoint (DELETE : '/admission/:id')




// DELETE ADMISSION REQUEST--------------------------------------------------------------------------------
router.delete('/all-requests/delete/:id', async(req, res)=>{
    const id = {_id: req.params.id};

    try {
        const deletedRequest = await Admission.findByIdAndDelete(id);
        return res.status(200).send({success: true, data: deletedRequest});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO DELETE REQUEST"});
    }
});
//---------------------------------------------------------------------------------------------------------


// router.delete('/:id', fetchUser, async (req, res) => {
//     try {
//         if (req.user.type !== "school" && req.user.type !== "admin")
//             return res.status(401).json({
//                 type: "error",
//                 message: "You are not authorized to perform this action."
//             });

//         let del = await Admission.findByIdAndDelete(req.params.id);
//         if (!del)
//             return res.status(404).json({
//                 type: "error",
//                 message: "Admission request not found."
//             });

//         res.status(200).json({
//             type: "success",
//             message: "Admission request deleted successfully."
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