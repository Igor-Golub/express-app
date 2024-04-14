import NotifyService from "../application/notification/NotifyService";
import EmailTemplatesCreator from "../application/notification/email/EmailTemplatesCreator";
import { inject, injectable } from "inversify";

@injectable()
class NotifyManager {
  constructor(
    @inject(NotifyService) private readonly emailService: NotifyService,
    @inject(EmailTemplatesCreator) private readonly emailTemplatesCreator: EmailTemplatesCreator,
  ) {}

  public async sendRegistrationEmail(login: string, email: string, code: string) {
    return this.emailService.sendEmail({
      from: "<MEGA service>",
      address: email,
      subject: "Registration on MEGA service",
      template: this.emailTemplatesCreator.getRegistrationTemplate(login, code),
    });
  }

  public async sendRecoveryEmail(login: string, email: string, code: string) {
    return this.emailService.sendEmail({
      from: "<MEGA service>",
      address: email,
      subject: "Recovery password",
      template: this.emailTemplatesCreator.getRecoveryTemplate(login, code),
    });
  }
}

export default NotifyManager;
