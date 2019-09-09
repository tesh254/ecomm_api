import nodemailer from "nodemailer";
import config from "../config";
import verifyEmail from "./verifyEmail";
import passwordResetEmail from "./passwordResetEmail";
import { jwtSignature } from "./jwt";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: config.mail.email,
    pass: config.mail.password
  }
});

const sendMail = data => {
  let link = `${config.ui}email-verify/${jwtSignature(data.toMail)}`;

  let mailOptions = {
    from: config.mail.email,
    to: data.toMail,
    subject: data.subject,
    html: verifyEmail(data.username, data.toMail, link)
  };

  transporter.sendMail(mailOptions, error => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Email sent");
      transporter.close();
    }
  });
};

export const passResetMail = data => {
  let link = `${config.ui}password-reset/${jwtSignature(data.toMail)}`;

  let mailOptions = {
    from: config.mail.email,
    to: data.toMail,
    subject: data.subject,
    html: passwordResetEmail(data.username, data.toMail, link)
  };

  transporter.sendMail(mailOptions, error => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Email sent");
      transporter.close();
    }
  });
};

export default sendMail;
