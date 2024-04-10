import { WithId } from "mongodb";
import { RecoveryStatus } from "../enums/Recovery";
import { LikeStatus } from "../enums/Common";

export declare global {
  namespace DBModels {
    type MongoResponseEntity<Entity> = WithId<Entity>;

    interface Blog {
      name: string;
      description: string;
      websiteUrl: string;
      isMembership: boolean;
    }

    interface Post {
      title: string;
      shortDescription: string;
      content: string;
      blogId: string;
      blogName: string;
    }

    interface User {
      login: string;
      email: string;
      hash: string;
      confirmation: {
        isConfirmed: boolean;
        code: string;
        expirationDate: Date;
      };
    }

    interface Comment {
      postId: string;
      content: string;
      commentatorInfo: {
        userId: string;
        userLogin: string;
      };
    }

    interface Sessions {
      version: string;
      userId: string;
      deviceId: string;
      deviceName: string;
      deviceIp: string;
      dateOfDeath: Date;
    }

    interface UnauthorizedSessions {
      deviceId: string;
      dateOfDeath: Date;
    }

    interface EndpointsLogs {
      ip: string;
      lastCall: string;
      endpoint: string;
    }

    interface Recovery {
      userId: string;
      code: string;
      status: RecoveryStatus;
      expirationDate: Date;
    }

    interface CommentsLikes {
      userId: string;
      commentId: string;
      status: LikeStatus;
    }
  }
}
