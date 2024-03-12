import "@/be/envConfig"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./be/schema.ts",
  out: "./be/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
})
