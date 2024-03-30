import dotenv from "dotenv";

dotenv.config();

const mainConfig = {
  port: process.env.PORT ?? 5000,
  jwt: {
    accessSecret: String(process.env.JWT_ACCESS_SECRET),
    accessLifeTime: String(process.env.JWT_ACCESS_LIFE_TIME),
    refreshSecret: String(process.env.JWT_REFRESH_SECRET),
    refreshLifeTime: String(process.env.JWT_REFRESH_LIFE_TIME),
  },
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
  authSessions: {
    secret: String(process.env.AUTH_SESSION_SECRET),
  },
  rateLimit: {
    callsAmount: Number(process.env.RATE_LIMIT_CALLS_AMOUNT),
    time: Number(process.env.RATE_LIMIT_TIME),
  },
};

export default mainConfig;
