import nodemailer from "nodemailer";
import mainConfig from "../configs/mainConfig";

class SMTPEmailAdapter implements Base.Notify {
  private transport;

  constructor() {
    this.transport = this.createTransport();
  }

  private createTransport() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mainConfig.smtp.email.email,
        pass: mainConfig.smtp.email.password,
      },
    });
  }

  public async send({ address, subject, from, template }: Base.NotifyOptions) {
    return this.transport.sendMail({
      from,
      to: address,
      subject: subject,
      html: template,
    });
  }
}

export default new SMTPEmailAdapter();
