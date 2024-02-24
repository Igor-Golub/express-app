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
  }
}
