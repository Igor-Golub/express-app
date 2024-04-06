export enum Routs {
  Root = "/",
  RootWithId = "/:id",
  AllData = "/all-data",
}

export enum BlogRouts {
  Root = "/",
  RootWithId = "/:id",
  BlogPosts = "/:id/posts",
  Login = "/login",
  Me = "/me",
}

export enum AuthRouts {
  Login = "/login",
  Refresh = "/refresh-token",
  Confirmation = "/registration-confirmation",
  Registration = "/registration",
  Resending = "/registration-email-resending",
  Logout = "/logout",
  Me = "/me",
  Recovery = "/recovery",
  NewPassword = "/new-password",
}

export enum CommentsRouts {
  RootWithId = "/:id",
}

export enum PostRouts {
  Root = "/",
  RootWithId = "/:id",
  Comments = "/:id/comments",
}

export enum SessionRoutes {
  Devices = "/devices",
  DevicesWithId = "/devices/:id",
}
