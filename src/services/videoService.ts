import DB from "./dbService";
import { BaseValidator } from "../validators/BaseValidator";

class VideoService {
  constructor(
    private dbService: DB,
    private validator: BaseValidator<Contracts.VideoValidationFields>,
  ) {}

  public get() {
    return this.dbService.get();
  }

  public getId(id: number) {
    return this.dbService.getId(id);
  }

  public create(videoEntity: Contracts.VideoModelCreateDTO) {
    const validationResult = this.validator.validate(videoEntity);

    if (validationResult.length) return validationResult;

    return this.dbService.create(videoEntity);
  }

  public update(id: number, videoEntity: Contracts.VideoModelUpdateDTO) {
    const validationResult = this.validator.validate(videoEntity);

    if (validationResult.length) return validationResult;

    if (!this.dbService.getId(id)) return null;

    return this.dbService.update(id, videoEntity);
  }

  public delete(id: number) {
    if (!this.dbService.getId(id)) return null;

    this.dbService.delete(id);

    return true;
  }

  public clearData() {
    this.dbService.clear();
  }
}

export default VideoService;
