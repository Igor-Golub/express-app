import dotenv from "dotenv";

dotenv.config();

const mainConfig = {
  jwtSecret: process.env.JWT_SECRET ?? "12345678",
  rootUser: {
    password: process.env.ROOT_USER_PASSWORD,
  },
};

export default mainConfig;
