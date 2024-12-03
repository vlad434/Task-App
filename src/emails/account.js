const sgMail = require("@sendgrid/mail");
require("dotenv").config({ path: "./config/.env" });

const sendgridAPIkey = process.env.SENDGRIDAPIKEY;

sgMail.setApiKey(sendgridAPIkey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "vladilie069@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}!`,
  });
};

module.exports = {
  sendWelcomeEmail,
};
