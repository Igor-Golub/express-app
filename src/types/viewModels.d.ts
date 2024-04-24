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

    interface PostWithLikes extends Post {
      likesInfo: LikesInfo;
    }

    interface PostWithFullLikes extends Post {
      extendedLikesInfo: ExtendedLikesInfo;
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
      likesInfo: LikesInfo;
    }

    interface CommentatorInfo {
      userId: string;
      userLogin: string;
    }

    interface LikesInfo {
      likesCount: number;
      dislikesCount: number;
      myStatus: LikeStatus;
    }

    interface ExtendedLikesInfo extends LikesInfo {
      newestLikes: NewestLikesInfo[];
    }

    interface NewestLikesInfo {
      login: string;
      userId: string;
      addedAt: string;
    }

    interface Session {
      ip: string;
      title: string;
      deviceId: string;
      lastActiveDate: string;
    }
  }
}
