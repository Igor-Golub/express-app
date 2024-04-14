import SMTPEmailAdapter from "../../../adapters/SMTPEmailAdapter";
import { inject, injectable } from "inversify";

@injectable()
class EmailNotify {
  constructor(@inject(SMTPEmailAdapter) private readonly emailAdapter: Base.Notify) {}

  public async send(options: Base.NotifyOptions) {
    return this.emailAdapter.send(options);
  }
}

export default EmailNotify;
