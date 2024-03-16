import nodemailer from "nodemailer";
import { htmlToText } from "html-to-text";
import pug from "pug";

export default class Email {
  constructor(user, url, resetPageUrl) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.resetPageUrl = resetPageUrl;
    this.from = `Mohammad Keshtegar <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`./views/email/${template}.pug`, {
      url: this.url,
      resetPageUrl: this.resetPageUrl,
      firstName: this.firstName,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.send("forgotPassword", "Your reset password token (valid for 10 mins)");
  }
}
