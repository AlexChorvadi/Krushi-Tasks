const nodemailer = require("nodemailer");

console.log("MAIL FILE LOADED", process.env.EMAIL_PASS, process.env.EMAIL);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify((error, success) => {
  console.log("VERIFY RUNNING");
  if (error) {
    console.log(error);
  } else {
    console.log("SMTP READY");
  }

});

module.exports = transporter;