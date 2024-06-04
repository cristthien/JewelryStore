const nodeMailer = require("nodemailer");
const mailConfig = require("../config/mailer.config.js");
const {
  verifyEmailHTMLGenerator,
  forgotPasswordHTMLGenerator,
  verifyChangeEmailHTMLGenerator,
  thankYouEmailHTMLGenerator,
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
  const htmlContent = forgotPasswordHTMLGenerator(to, token);
  const options = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transport.sendMail(options);
};
exports.sendVerifyChangeEmail = (to, subject, token) => {
  const transport = nodeMailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: false,
    auth: {
      user: mailConfig.USERNAME,
      pass: mailConfig.PASSWORD,
    },
  });
  const htmlContent = verifyChangeEmailHTMLGenerator(to, token);
  const options = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transport.sendMail(options);
};
exports.thankyouEmail = (to, subject) => {
  const transport = nodeMailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: false,
    auth: {
      user: mailConfig.USERNAME,
      pass: mailConfig.PASSWORD,
    },
  });
  const htmlContent = thankYouEmailHTMLGenerator();
  const options = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transport.sendMail(options);
};
