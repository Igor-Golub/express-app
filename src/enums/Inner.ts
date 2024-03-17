export enum ResultStatuses {
  Success,
  NotFound,
  Forbidden,
  Unauthorized,
}

export enum ErrorMessages {
  EmailAlreadyExist = "Email already exist",
  LoginAlreadyExist = "Login already exist",
  ConfirmationCodeAlreadyConfirmed = "Confirmation code already confirmed",
  UserNotFound = "User not found",
  ConfirmationCodeExpired = "Confirmation code expired",
}
