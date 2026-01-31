import { defineConfig } from "@prisma/config";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

export default defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
});
