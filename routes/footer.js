const express = require("express");
const router = express.Router();

const Footer = require("../model/footer");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1 - Get all footer details with endpoint (POST : '/footer/all')
router.get('/all', async (req, res) => {
    try {
        const details = await Footer.find();
        if (details.length === 0)
            return res.status(200).json({
                type: "success",
                message: "No details found.",
                data: []
            });

        res.status(200).json({
            type: "success",
            message: "Footer details fetched successfully.",
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


// ROUTE 2 - Update the footer with endpoint (PUT : '/staff/update')
router.put('/update', fetchUser, async (req, res) => {
    try {
        const { mobile, email, address, fax, instagram, twitter, facebook, youtube, linkedin } = req.body;

        if (req.user.type !== "admin" && req.user.type !== "school")
            return res.status(401).json({
                type: "error",
                message: "You are not authorized to perform this action."
            });

        if (!mobile || !email || !address || !fax || !instagram || !twitter || !facebook || !youtube || !linkedin)
            return res.status(400).json({
                type: "error",
                message: "Please fill all the details"
            })

        const existing = await Footer.find();

        if (!existing.length) {
            await Footer.create({
                mobile,
                email,
                address,
                fax,
                instagram,
                twitter,
                facebook,
                youtube,
                linkedin
            });
        } else {
            await Footer.findByIdAndUpdate(existing[0]._id, {
                mobile: mobile || existing[0].mobile,
                email: email || existing[0].email,
                address: address || existing[0].address,
                fax: fax || existing[0].fax,
                instagram: instagram || existing[0].instagram,
                twitter: twitter || existing[0].twitter,
                facebook: facebook || existing[0].facebook,
                youtube: youtube || existing[0].youtube,
                linkedin: linkedin || existing[0].linkedin
            }, { new: true });
        }

        res.status(200).json({
            type: "success",
            message: "Footer details updated successfully."
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