import schedule from "node-schedule";

class CronService {
  public scheduleTask(rule: string, action: Utils.AnyFunction) {
    schedule.scheduleJob(rule ?? "0 0,12 * * *", action);
  }
}

export default new CronService();
