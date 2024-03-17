import dotenv from "dotenv";

dotenv.config();

const mainConfig = {
  port: process.env.PORT ?? 5000,
  jwtSecret: process.env.JWT_SECRET ?? "12345678",
  rootUser: {
    password: process.env.ROOT_USER_PASSWORD,
  },
  smtp: {
    email: {
      email: String(process.env.SMTP_EMAIL),
      password: String(process.env.SMTP_PASSWORD),
    },
  },
  confirmation: {
    expirationDateTimeout: Number(process.env.CONFIRMATION_EXPIRATION_TIMEOUT),
  },
};

export default mainConfig;
