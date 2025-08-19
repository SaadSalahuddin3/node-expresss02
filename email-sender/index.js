require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Email Transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Route: /sendemail
app.get('/sendemail', async (req, res) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: [
            process.env.EMAIL_USER, // Your own email
            'venugopal.burli@masaischool.com' // Masai email
        ],
        subject: 'Test Mail from NEM student',
        text: 'This is a testing Mail sent by NEM student, no need to reply.',
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
