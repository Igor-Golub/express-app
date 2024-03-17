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
}

export default new EmailTemplatesCreator();
