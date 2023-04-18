const express = require("express");
const router = express.Router();

const Payment = require("../model/payment");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1 - Create a payment with endpoint (POST : '/payment/create').


// SEND PAYMENT INFO ====================================================================================================
router.post('/send-proof', async(req, res)=>{
    let { name, class_name, section, mobile, installment, amount, method, proof } = req.body;

    const newPaymentData = new Payment({
        name, class_name, section, mobile, installment, amount, method, proof
    });

    try {
        const paymentData = await newPaymentData.save();
        return res.status(200).send({success: true, data: paymentData});
    } catch (error) {
        return res.status(501).send({success: false, msg: "FAILED TO SEND PAYMENT PROOF"});
    }

})





// router.post("/create", async (req, res) => {
//     let { name, class_name, section, mobile, installment, amount, method, proof } = req.body;

//     try {
//         if (!name || !class_name || !section || !mobile || !installment || !amount || !method || !proof)
//             return res.status(400).json({
//                 type: "error",
//                 message: "Please fill all the fields."
//             });

//         let pay = await Payment.create({
//             name,
//             class_name,
//             section,
//             mobile,
//             installment,
//             amount,
//             method,
//             proof
//         });

//         if (pay)
//             return res.status(200).json({
//                 type: "success",
//                 message: "Submitted successfully."
//             });
//         else
//             return res.status(500).json({
//                 type: "error",
//                 message: "Error while submitting."
//             });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             type: "error",
//             message: "Something went wrong."
//         });
//     }
// });

// ROUTE 2 - Get all payment request with endpoint (POST : '/payment/all')
router.post('/all', fetchUser, async (req, res) => {
    try {
        if (req.user.type !== "school" && req.user.type !== "admin")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        const details = await Payment.find();
        if (details.length === 0)
            return res.status(200).json({
                type: "success",
                message: "No details found.",
                data: []
            });

        res.status(200).json({
            type: "success",
            message: "Payment details fetched successfully.",
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

// ROUTE 3 - Get the payment request from ID with endpoint (POST : '/payment/:id')
router.post('/:id', fetchUser, async (req, res) => {
    try {
        if (req.user.type !== "school" && req.user.type !== "admin")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        const details = await Payment.findById(req.params.id);
        if (!details)
            return res.status(404).json({
                type: "error",
                message: "Details not found."
            });

        res.status(200).json({
            type: "success",
            message: "Payment details fetched successfully.",
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

// ROUTE 4 - Delete the payment request with endpoint (DELETE : '/payment/:id')
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        if (req.user.type !== "school" && req.user.type !== "admin")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        let del = await Payment.findByIdAndDelete(req.params.id);
        if (!del)
            return res.status(404).json({
                type: "error",
                message: "Payment request not found."
            });
            
        res.status(200).json({
            type: "success",
            message: "Payment request deleted successfully."
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