// utils/sendMail.js

const { BrevoClient } = require("@getbrevo/brevo");

const client = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

async function sendMail({
    to,
    to_name,
    subject,
    html,
    text,
    from = process.env.BREVO_SENDER_EMAIL,
    from_name = "Authentication System",
}) {
    // console.log("Sending email to:", from);
    try {
        const response = await client.transactionalEmails.sendTransacEmail({
            sender: {
                email: from,
                name: from_name,
            },
            to: [
                {
                    email: to,
                    name: to_name || "",
                },
            ],
            subject,
            htmlContent: html,
            textContent: text,
        });

        return response;
    } catch (error) {
        console.error("Brevo Email Error:", error);
        throw error;
    }
}

module.exports = sendMail;