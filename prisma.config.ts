import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

export default {
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
};
