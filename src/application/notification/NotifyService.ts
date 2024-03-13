import EmailNotify from "./email/EmailNotify";

class NotifyService {
  constructor(private readonly emailNotify: typeof EmailNotify) {}

  public sendEmail(options: Pick<Base.NotifyOptions, "from" | "address" | "subject" | "template">) {
    return this.emailNotify.send(options);
  }
}

export default new NotifyService(EmailNotify);
