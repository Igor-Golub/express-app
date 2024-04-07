import NotifyService from "../application/notification/NotifyService";
import EmailTemplatesCreator from "../application/notification/email/EmailTemplatesCreator";

class NotifyManager {
  constructor(
    private readonly emailService: typeof NotifyService,
    private readonly emailTemplatesCreator: typeof EmailTemplatesCreator,
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

export default new NotifyManager(NotifyService, EmailTemplatesCreator);
