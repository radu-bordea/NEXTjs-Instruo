// prisma.config.ts (or prisma7.config.ts)
// Prisma 7: the database URL for the CLI (migrate, studio) lives here,
// not in schema.prisma anymore.

import "dotenv/config"; // loads .env
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Direct connection: migrations shouldn't go through the pooler
    url: env("DATABASE_URL_UNPOOLED"),
  },
});