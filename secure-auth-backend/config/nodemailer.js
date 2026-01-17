const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", // testiing email
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

exports.sendResetEmail = async (to, resetLink) => {
    const info = await transporter.sendMail({
        from: '"Your App" <no-reply@yourapp.com>',
        to,
        subject: "Password Reset",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 30 minutes.</p>`
    });

    console.log('Reset email sent:', info.messageId);
};
