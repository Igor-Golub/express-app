import { Request, Response } from "express";
import UserService from "../services/userService";
import { UserQueryRepository } from "../repositories/query";
import DBService from "../application/dbService";
import { UserCommandRepository } from "../repositories/command";
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
    private filterService: Base.FilterService<ViewModels.Blog>,
    private paginationService: typeof PaginationService,
  ) {}

  public getAll = async (
    req: Utils.ReqWithQuery<Params.PaginationAndSortingQueryParams>,
    res: Response<ViewModels.ResponseWithPagination<ViewModels.User>>,
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

    const data = await this.userQueryRepository.getWithPagination(
      this.sortingService.createSortCondition(),
      this.filterService.getFilters(),
    );

    res.status(StatusCodes.Ok_200).send(data);
  };

  public create = async (req: Utils.ReqWithReqBody<DTO.UserCreate>, res: Response) => {
    const entity = req.body;

    const result = await this.userService.createUser(entity);

    if (!result) res.status(StatusCodes.BadRequest_400).end();
    else res.status(StatusCodes.Created_201).send(result);
  };

  public delete = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const id = req.params.id;

    const result = await this.userService.delete(String(id));

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).end();
  };
}

export default new UserController(UserQueryRepository, UserService, SortingService, FilterService, PaginationService);
