import { Container } from "inversify";
import {
  BlogService,
  CommentsLikesService,
  CommentsService,
  PostService,
  SessionsService,
  UserService,
} from "./services";
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
import {
  AuthSessionCommandRepo,
  BlogCommandRepo,
  CommentsCommandRepo,
  CommentsLikesCommandRepo,
  PostCommandRepo,
  RecoveryCommandRepo,
  UserCommandRepo,
} from "./repositories/command";
import CommentController from "./controllers/commentController";
import { BlogQueryRepo, CommentsQueryRepo, PostQueryRepo, SessionQueryRepo, UserQueryRepo } from "./repositories/query";
import BlogController from "./controllers/blogController";
import TestingController from "./controllers/testingController";
import UserController from "./controllers/userController";
import NotifyManager from "./managers/NotifyManager";
import NotifyService from "./application/notification/NotifyService";
import EmailNotify from "./application/notification/email/EmailNotify";
import SMTPEmailAdapter from "./adapters/SMTPEmailAdapter";
import EmailTemplatesCreator from "./application/notification/email/EmailTemplatesCreator";

const container = new Container();

// Blogs

container.bind(BlogController).toSelf();
container.bind(BlogService).toSelf();
container.bind(BlogQueryRepo).toSelf();
container.bind(BlogCommandRepo).toSelf();

// Posts

container.bind(PostQueryRepo).toSelf();
container.bind(PostService).toSelf();
container.bind(PostCommandRepo).toSelf();

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

// Session

container.bind(SessionQueryRepo).toSelf();
container.bind(SessionsService).toSelf();

// Application

container.bind(PaginationService).toSelf();
container.bind(SortingService).toSelf();
container.bind(FilterService).toSelf();
container.bind(CryptographyService).toSelf();
container.bind(JWTService).toSelf();
container.bind(CookiesService).toSelf();
container.bind(CronService).toSelf();
container.bind(AuthService).toSelf();

container.bind(NotifyService).toSelf();
container.bind(EmailNotify).toSelf();
container.bind(SMTPEmailAdapter).toSelf();
container.bind(EmailTemplatesCreator).toSelf();
container.bind(NotifyManager).toSelf();

container.bind(TestingController).toSelf();

container.bind(RecoveryCommandRepo).toSelf();
container.bind(AuthSessionCommandRepo).toSelf();

export { container };
