import { LikeStatus } from "../enums";

export declare global {
  namespace ViewModels {
    interface BaseModel {
      id: string;
      createdAt: string;
    }

    interface Blog extends BaseModel {
      name: string;
      description: string;
      websiteUrl: string;
      isMembership: boolean;
    }

    interface Post extends BaseModel {
      title: string;
      shortDescription: string;
      content: string;
      blogId: string;
      blogName: string;
    }

    interface User extends BaseModel {
      login: string;
      email: string;
    }

    interface UserMe {
      login: string;
      email: string;
      userId: string;
    }

    interface Comment extends BaseModel {
      content: string;
      commentatorInfo: CommentatorInfo;
      likesInfo: CommentsLike;
    }

    interface CommentatorInfo {
      userId: string;
      userLogin: string;
    }

    interface CommentsLike {
      likesCount: number;
      dislikesCount: number;
      myStatus: LikeStatus;
    }

    interface Session {
      ip: string;
      title: string;
      deviceId: string;
      lastActiveDate: string;
    }
  }
}
