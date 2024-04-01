export enum ResultStatuses {
  Success,
  BadRequest,
  NotFound,
  Forbidden,
  Unauthorized,
}

export enum ErrorMessages {
  EmailAlreadyExist = "Email already exist",
  LoginAlreadyExist = "Login already exist",
  UserAlreadyConfirmed = "User already confirmed",
  UserNotFound = "User not found",
  ConfirmationCodeExpired = "Confirmation code expired",
}
