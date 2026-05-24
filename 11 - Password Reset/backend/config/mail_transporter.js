const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

// transporter.verify((error, success) => {

//   if (error) {
//     console.log(error);
//   } else {
//     console.log("SMTP READY");
//   }

// });

module.exports = transporter;