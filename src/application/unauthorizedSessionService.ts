import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";
import DbService from "./db/dbService";
import CookiesService from "./cookiesService";

class UnauthorizedSessionService {
  constructor(
    private readonly dbService: typeof DbService,
    private readonly cookiesService: typeof CookiesService,
  ) {}

  public async appendSessionIdAndDeviceId(req: Request) {
    const deviceId = uuidv4();

    const { insertedId } = await this.dbService.unauthorizedSessionsCollection.insertOne({
      deviceId,
      dateOfDeath: add(new Date(), {
        minutes: 30,
      }),
    });

    return req;
  }
}

export default new UnauthorizedSessionService(DbService, CookiesService);
