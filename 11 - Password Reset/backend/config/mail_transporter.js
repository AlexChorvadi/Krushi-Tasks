const nodemailer = require("nodemailer");

console.log("BEFORE TRANSPORT");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },

  family: 4,

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

console.log("AFTER TRANSPORT");

transporter.verify((error, success) => {

  console.log("VERIFY CALLBACK");

  if (error) {
    console.log("VERIFY ERROR:", error);
  } else {
    console.log("SMTP READY");
  }

});

module.exports = transporter;