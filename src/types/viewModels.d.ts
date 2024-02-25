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
      name: string;
      password: string;
    }

    interface ResponseWithPagination<Entity> extends Base.PaginationView {
      items: Entity[];
    }
  }
}
