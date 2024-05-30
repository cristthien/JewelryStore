const nodeMailer = require("nodemailer");
const mailConfig = require("../config/mailer.config.js");
const {
  verifyEmailHTMLGenerator,
  forgotPasswordHTMLGenerator,
} = require("./HTMLGenerator.js");
require("dotenv").config();
exports.sendVerifyEmail = (to, subject, token) => {
  const transport = nodeMailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: false,
    auth: {
      user: mailConfig.USERNAME,
      pass: mailConfig.PASSWORD,
    },
  });
  const htmlContent = verifyEmailHTMLGenerator(to, token);
  const options = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transport.sendMail(options);
};
exports.sendResetPasswordEmail = (to, subject, token) => {
  const transport = nodeMailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: false,
    auth: {
      user: mailConfig.USERNAME,
      pass: mailConfig.PASSWORD,
    },
  });
  const htmlContent = forgotPasswordHTMLGenerator(token);
  const options = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transport.sendMail(options);
};
