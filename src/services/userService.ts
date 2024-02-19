class UserService {
  constructor(
    private userQueryRepository: Base.QueryRepository<Models.UserModel>,
    private userCommandRepository: Base.CommandRepository<Models.UserModel>,
  ) {}

  public async get() {
    return this.userQueryRepository.get();
  }

  public async create(entity: Models.UserModel) {
    return this.userCommandRepository.create(entity);
  }
}

export default UserService;
