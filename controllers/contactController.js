const Contact = require('../models/contact');
const sendEmail = require('../services/emailService');

const createContactMessage = async (req, res) => {
    try {
        const contactMessage = await Contact.create({
            pet: req.body.pet,
            sender: req.user._id,
            message: req.body.message
        });

        const petOwnerEmail = /* Fetch pet owner email based on pet ID */
        await sendEmail({
            to: petOwnerEmail,
            subject: 'New Adoption Inquiry',
            text: `You have a new inquiry about ${req.body.pet}. Message: ${req.body.message}`
        });

        res.status(201).json({ success: true, contactMessage });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { createContactMessage };
