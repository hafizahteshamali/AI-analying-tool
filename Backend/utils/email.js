import transporter from "./transporter.js";

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"ITX Solution" <${process.env.PORTAL_EMAIL}>`, 
            to: to,
            subject: subject,
            html: html,
        });

        console.log(`OTP sent to ${to} via email`);
    } catch (error) {
        console.log(`Error sending OTP to ${to} via email: ${error.message}`);
    }
};

export default sendEmail;
