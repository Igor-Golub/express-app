class UserService {
  constructor(
    private userQueryRepository: Base.QueryRepository<Contracts.UserModel>,
    private userCommandRepository: Base.CommandRepository<Contracts.UserModel>,
  ) {}

  public async get() {
    return this.userQueryRepository.get();
  }

  public async create(entity: Contracts.UserModel) {
    return this.userCommandRepository.create(entity);
  }
}

export default UserService;
