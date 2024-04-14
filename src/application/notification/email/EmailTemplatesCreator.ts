import { injectable } from "inversify";

@injectable()
class EmailTemplatesCreator {
  public getRegistrationTemplate(login: string, code: string) {
    return `
        <h1>Thank ${login} for your registration</h1>
        <p>
          To finish registration please follow the link below:
          <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>
        </p>
        `;
  }

  public getRecoveryTemplate(login: string, code: string) {
    return `
        <h1>Password recovery for, ${login}</h1>
          <p>To finish password recovery please follow the link below:
          <a href='https://somesite.com/password-recovery?recoveryCode=${code}'>recovery password</a>
        </p>
        `;
  }
}

export default EmailTemplatesCreator;
