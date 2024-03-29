import { Response } from "express";
import UserService from "../services/userService";
import { UserQueryRepository } from "../repositories/query";
import { StatusCodes } from "../enums/StatusCodes";
import { FiltersType } from "../enums/Filters";
import PaginationService from "../application/paginationService";
import SortingService from "../application/sortingService";
import FilterService from "../application/filterService";

class UserController {
  constructor(
    private userQueryRepository: typeof UserQueryRepository,
    private userService: typeof UserService,
    private sortingService: Base.SortingService,
    private filterService: Base.FilterService<DBModels.User>,
    private paginationService: typeof PaginationService,
  ) {}

  public getAll = async (
    req: Utils.ReqWithQuery<Params.PaginationAndSortingQueryParams>,
    res: Response<Base.ResponseWithPagination<ViewModels.User>>,
  ) => {
    const {
      query: { sortBy, sortDirection, searchLoginTerm, searchEmailTerm, pageSize, pageNumber },
    } = req;

    this.paginationService.setValues({ pageSize, pageNumber });
    this.filterService.setValues(
      {
        login: searchLoginTerm,
        email: searchEmailTerm,
      },
      FiltersType.OrAndInnerText,
    );
    this.sortingService.setValue(sortBy, sortDirection);

    const data = await this.userQueryRepository.getWithPagination();

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

export default new UserController(UserQueryRepository, UserService, SortingService, FilterService, PaginationService);
