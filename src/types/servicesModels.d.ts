export declare global {
  namespace ServicesModels {
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

    interface Session {
      id: string;
      version: number;
      userId: string;
      deviceId: string;
      deviceName: string;
      deviceIp: string;
    }
  }
}
