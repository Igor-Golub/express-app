export declare global {
  namespace DTO {
    interface BlogCreateAndUpdate {
      name: string;
      description: string;
      websiteUrl: string;
      isMembership: boolean;
    }

    interface PostCreateAndUpdate {
      title: string;
      shortDescription: string;
      content: string;
      blogId: string;
    }

    interface UserCreate {
      login: string;
      password: string;
      email: string;
    }

    interface Login {
      loginOrEmail: string;
      password: string;
    }

    interface Confirmation {
      code: string;
    }

    interface Registration {
      login: string;
      password: string;
      email: string;
    }

    interface Resending {
      email: string;
    }

    interface Comment {
      content: string;
    }

    interface DeviceMetaInfo {
      ip: string | undefined;
      name: string | undefined;
      userAgent: string | undefined;
    }
  }
}
