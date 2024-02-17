class UserService {
  constructor(private userRepository: Base.Repository<Contracts.UserModel>) {}

  public async get() {
    return this.userRepository.get();
  }

  public async create(entity: Contracts.UserModel) {
    return this.userRepository.create(entity);
  }
}

export default UserService;
