import SMTPEmailAdapter from "../../../adapters/SMTPEmailAdapter";

class EmailNotify {
  constructor(private readonly emailAdapter: Base.Notify) {}

  public async send(options: Base.NotifyOptions) {
    return this.emailAdapter.send(options);
  }
}

export default new EmailNotify(SMTPEmailAdapter);
