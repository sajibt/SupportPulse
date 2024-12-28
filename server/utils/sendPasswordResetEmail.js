import nodemailer from 'nodemailer';


const sendPasswordResetEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.SENDGRID_API_KEY,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent:', info.response);
    } catch (err) {
        console.error('Error sending email:', err);
        throw new Error('Error sending password reset email');
    }
};

export default sendPasswordResetEmail;

