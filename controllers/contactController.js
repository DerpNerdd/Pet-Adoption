// controllers/contactController.js
const Pet = require('../models/pet');
const nodemailer = require('nodemailer');

const showContactForm = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.petId).populate('owner');
        if (!pet) {
            return res.status(404).send('Pet not found');
        }
        const petOwner = pet.owner;
        res.render('contact', { pet, petOwner });
    } catch (error) {
        console.error('Error displaying contact form:', error);
        res.status(500).send('An error occurred');
    }
};

const sendEmail = async (req, res) => {
    const { subject, message } = req.body;
    const { petId } = req.params;

    try {
        if (!req.user || !req.user.email) {
            return res.status(401).send('You must be logged in to send a message.');
        }

        const pet = await Pet.findById(petId).populate('owner');
        if (!pet) {
            return res.status(404).send('Pet not found');
        }
        const petOwner = pet.owner;

        const senderEmail = req.user.email;
        const senderName = req.user.name || 'Interested Adopter';

        // Configure nodemailer with your application's email account
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Email options
        const mailOptions = {
            from: `"${senderName}" <${process.env.EMAIL_USERNAME}>`,
            replyTo: senderEmail,
            to: petOwner.email,
            subject: subject,
            text: message,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');

        // Render the success page with redirection
        res.render('email-sent');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('An error occurred while sending the email.');
    }
};

  module.exports = { showContactForm, sendEmail };