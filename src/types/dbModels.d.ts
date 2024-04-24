import { WithId } from "mongodb";
import { SchemaTimestampsConfig } from "mongoose";
import { RecoveryStatus, LikeStatus } from "../enums";

export declare global {
  namespace DBModels {
    type MongoResponseEntity<Entity> = WithId<Entity>;

    type MongoTimestamps = SchemaTimestampsConfig;

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

    interface CommentsLikes extends MongoTimestamps {
      userId: string;
      commentId: string;
      status: LikeStatus;
    }

    interface PostsLikes extends MongoTimestamps {
      userId: string;
      login: string;
      postId: string;
      status: LikeStatus;
    }
  }
}
