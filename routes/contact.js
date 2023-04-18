const express = require("express");
const router = express.Router();

const Contact = require("../model/contact");
const fetchUser = require("../middleware/fetchUser");

// CREATE NEW CONTACT INFO----------------------------------------------------------------------------------
router.post("/create", async (req, res) => {
    let { name, email, subject, message } = req.body;

    const newContact = new Contact({
        name, email, subject, message
    });

    try {
        const savedContact = await newContact.save();
        return res.status(200).send({success: true, data: savedContact});
    } catch (err) {
        return res.status(500).send({success: false, msg: "FAILED TO SAVE CONTACT"});
    }
});
// ---------------------------------------------------------------------------------------------------------












// FETCH ALL CONTACT INFO----------------------------------------------------------------------------------
router.get('/all', async (req, res) => {
    try {
        const foundItems = await Contact.find();
        return res.status(200).send({success: true, data: foundItems});
    } catch (err) {

        return res.status(200).send({success: false, msg: 'FAILED TO LOAD CONTACT'});
    }
});
//----------------------------------------------------------------------------------------------------------












// FIND CONTACT BY ID---------------------------------------------------------------------------------------
router.get('/:id', async (req, res) => {

    const id = {_id: req.params.id};

    try {
        const foundContact = await Contact.findById(id);
        return res.status(200).send({success: true, data: foundContact});
    } catch (err) {
        return res.status(500).send({success: false, msg: "FAILED TO FOUND CONTACT INFORMATION"});
    }
});
//----------------------------------------------------------------------------------------------------------












// DELETE CONTACT BY ID-------------------------------------------------------------------------------------
router.delete('/delete/:id', async (req, res) => {
    const id = {_id: req.params.id};

    try {
        const deletedItem = await Contact.findByIdAndDelete(id);
        return res.status(200).send({success: true, data: deletedItem});
    } catch (err) {
        return res.status(500).send({success: false, msg: "FAILED TO DELETE CONTACT"});
    }
});
//-----------------------------------------------------------------------------------------------------------
module.exports = router;












        // FETCH CONTACTS
        // if (req.user.type !== "school" && req.user.type !== "admin")
        //     return res.status(401).json({
        //         type: "error",
        //         message: "You are not authorized to perform this action."
        //     });

        // const contact = await Contact.find();
        // if (contact.length === 0)
        //     return res.status(200).json({
        //         type: "success",
        //         message: "No details found.",
        //         data: []
        //     });

        // res.status(200).json({
        //     type: "success",
        //     message: "Contact details fetched successfully.",
        //     data: contact
        // });

                // console.log(err);
        // res.status(500).json({
        //     type: "error",
        //     message: "Something went wrong."
        // });











        

        // if (req.user.type !== "school" && req.user.type !== "admin")
        //     return res.status(401).json({
        //         type: "error",
        //         message: "You are not authorized to perform this action."
        //     });

        // const contact = await Contact.findById(req.params.id);
        // if (!contact)
        //     return res.status(404).json({
        //         type: "error",
        //         message: "Details not found."
        //     });

        // res.status(200).json({
        //     type: "success",
        //     message: "Contact details fetched successfully.",
        //     data: contact
        // });

                // console.log(err);
        // res.status(500).json({
        //     type: "error",
        //     message: "Something went wrong."
        // });














        
        // if (req.user.type !== "school" && req.user.type !== "admin")
        //     return res.status(401).json({
        //         type: "error",
        //         message: "You are not authorized to perform this action."
        //     });

        // let del = await Contact.findByIdAndDelete(req.params.id);
        // if (!del)
        //     return res.status(404).json({
        //         type: "error",
        //         message: "Details not found."
        //     });

        // res.status(200).json({
        //     type: "success",
        //     message: "Detail deleted successfully."
        // });

                // console.log(err);
        // res.status(500).json({
        //     type: "error",
        //     message: "Something went wrong."
        // });
