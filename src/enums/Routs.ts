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
  Confirmation = "/registration-confirmation",
  Registration = "/registration",
  Resending = "/registration-email-resending",
  Me = "/me",
  Refresh = "/refresh",
}

export enum CommentsRouts {
  RootWithId = "/:id",
}

export enum PostRouts {
  Root = "/",
  RootWithId = "/:id",
  Comments = "/:id/comments",
}
