import { Response } from "express";
import { inject, injectable } from "inversify";
import { StatusCodes, FiltersType } from "../../../enums";
import { PaginationService, FilterService, SortingService } from "../../../application";
import UserService from "../app/userService";
import UserQueryRepo from "../infrastructure/userQueryRepository";

@injectable()
class UserController {
  constructor(
    @inject(UserQueryRepo) private readonly userQueryRepo: UserQueryRepo,
    @inject(UserService) private readonly userService: UserService,
    @inject(SortingService) private readonly sortingService: Base.SortingService,
    @inject(FilterService) private readonly filterService: Base.FilterService<DBModels.User>,
    @inject(PaginationService) private readonly paginationService: PaginationService,
  ) {}

  public getAll = async (
    req: Utils.ReqWithQuery<Params.PaginationAndSortingQueryParams>,
    res: Response<Base.ResponseWithPagination<ViewModels.User>>,
  ) => {
    const {
      query: { sortBy, sortDirection, searchLoginTerm, searchEmailTerm, pageSize, pageNumber },
    } = req;

    this.paginationService.setValues({ pageSize, pageNumber });
    this.sortingService.setValue(sortBy, sortDirection);
    this.filterService.setValues(
      {
        login: searchLoginTerm,
        email: searchEmailTerm,
      },
      FiltersType.OrAndInnerText,
    );

    const data = await this.userQueryRepo.getWithPagination();

    res.status(StatusCodes.Ok_200).send(data);
  };

  public create = async (req: Utils.ReqWithReqBody<DTO.UserCreate>, res: Response) => {
    const { body: entity } = req;

    const result = await this.userService.createUser(entity);

    if (result.status) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Created_201).send(result.meta.data);
  };

  public delete = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const {
      params: { id },
    } = req;

    const result = await this.userService.delete(String(id));

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).end();
  };
}

export default UserController;
