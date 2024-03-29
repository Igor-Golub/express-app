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
      commentatorInfo: {
        userId: string;
        userLogin: string;
      };
    }

    interface Session {
      ip: string;
      title: string;
      deviceId: string;
      lastActiveDate: string;
    }
  }
}
