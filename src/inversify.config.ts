import { Container } from "inversify";
import {
  AuthService,
  CookiesService,
  CronService,
  CryptographyService,
  FilterService,
  JWTService,
  PaginationService,
  SortingService,
} from "./application";
import NotifyManager from "./managers/NotifyManager";
import NotifyService from "./application/notification/NotifyService";
import EmailNotify from "./application/notification/email/EmailNotify";
import SMTPEmailAdapter from "./adapters/SMTPEmailAdapter";
import EmailTemplatesCreator from "./application/notification/email/EmailTemplatesCreator";

import BlogController from "./modules/blog/api/blogController";
import BlogService from "./modules/blog/app/blogService";
import BlogCommandRepo from "./modules/blog/infrastructure/blogCommandRepo";
import BlogQueryRepo from "./modules/blog/infrastructure/blogQueryRepo";

import PostQueryRepo from "./modules/post/infrastructure/postQueryRepo";
import PostService from "./modules/post/app/postService";
import PostLikesService from "./modules/post/app/postLikesService";
import PostCommandRepo from "./modules/post/infrastructure/postCommandRepo";
import PostLikesCommandRepo from "./modules/post/infrastructure/postLikesCommandRepo";

import CommentController from "./modules/comment/api/commentController";
import CommentsService from "./modules/comment/app/commentsService";
import CommentsLikesService from "./modules/comment/app/commentsLikesService";
import CommentsQueryRepo from "./modules/comment/infrastructure/commentsQueryRepo";
import CommentsCommandRepo from "./modules/comment/infrastructure/commentsCommandRepo";
import CommentsLikesCommandRepo from "./modules/comment/infrastructure/commentsLikesCommandRepo";

import UserController from "./modules/user/api/userController";
import UserService from "./modules/user/app/userService";
import UserQueryRepo from "./modules/user/infrastructure/userQueryRepository";
import UserCommandRepo from "./modules/user/infrastructure/userCommandRepo";
import SessionQueryRepo from "./modules/auth/infrastructure/sessionQueryRepo";
import SessionsService from "./modules/auth/app/sessionsService";
import RecoveryCommandRepo from "./modules/auth/infrastructure/recoveryCommandRepo";
import AuthSessionCommandRepo from "./modules/auth/infrastructure/authSessionCommandRepo";

import TestingController from "./modules/testing/api/testingController";

const container = new Container();

// Blogs

container.bind(BlogController).toSelf();
container.bind(BlogService).toSelf();
container.bind(BlogQueryRepo).toSelf();
container.bind(BlogCommandRepo).toSelf();

// Posts

container.bind(PostQueryRepo).toSelf();
container.bind(PostService).toSelf();
container.bind(PostLikesService).toSelf();
container.bind(PostCommandRepo).toSelf();
container.bind(PostLikesCommandRepo).toSelf();

// Comments

container.bind(CommentController).toSelf();
container.bind(CommentsService).toSelf();
container.bind(CommentsLikesService).toSelf();
container.bind(CommentsQueryRepo).toSelf();
container.bind(CommentsCommandRepo).toSelf();
container.bind(CommentsLikesCommandRepo).toSelf();

// Users

container.bind(UserController).toSelf();
container.bind(UserService).toSelf();
container.bind(UserQueryRepo).toSelf();
container.bind(UserCommandRepo).toSelf();

// Auth

container.bind(SessionQueryRepo).toSelf();
container.bind(SessionsService).toSelf();
container.bind(RecoveryCommandRepo).toSelf();
container.bind(AuthSessionCommandRepo).toSelf();
container.bind(AuthService).toSelf();

// Testing

container.bind(TestingController).toSelf();

// Application

container.bind(PaginationService).toSelf();
container.bind(SortingService).toSelf();
container.bind(FilterService).toSelf().inSingletonScope();
container.bind(CryptographyService).toSelf();
container.bind(JWTService).toSelf();
container.bind(CookiesService).toSelf();
container.bind(CronService).toSelf();

container.bind(NotifyService).toSelf();
container.bind(EmailNotify).toSelf();
container.bind(SMTPEmailAdapter).toSelf();
container.bind(EmailTemplatesCreator).toSelf();
container.bind(NotifyManager).toSelf();

export { container };
