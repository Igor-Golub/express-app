import EmailNotify from "./email/EmailNotify";
import { inject, injectable } from "inversify";

@injectable()
class NotifyService {
  constructor(@inject(EmailNotify) private readonly emailNotify: EmailNotify) {}

  public sendEmail(options: Pick<Base.NotifyOptions, "from" | "address" | "subject" | "template">) {
    return this.emailNotify.send(options);
  }
}

export default NotifyService;
