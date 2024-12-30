const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Email Sending Endpoint
app.post('/send-mail', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com', // Your email
                pass: 'your-email-password', // Your email password or app password
            },
        });

        const mailOptions = {
            from: email,
            to: 'your-email@gmail.com', // Your email to receive messages
            subject: `Message from ${name}`,
            text: message,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Mail sent successfully');
    } catch (error) {
        console.error('Error sending mail:', error);
        res.status(500).send('Failed to send mail');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
