import dotenv from "dotenv";

dotenv.config();

const mainConfig = {
  port: process.env.PORT ?? 5000,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? "12345678",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "87654321",
  rootUser: {
    password: process.env.ROOT_USER_PASSWORD,
  },
  smtp: {
    email: {
      email: String(process.env.SMTP_EMAIL),
      password: String(process.env.SMTP_PASSWORD),
    },
  },
  registration: {
    successMessage: String(process.env.REGISTRATION_SUCCESS_MESSAGE),
    expirationDateTimeout: Number(process.env.CONFIRMATION_EXPIRATION_TIMEOUT),
  },
};

export default mainConfig;
