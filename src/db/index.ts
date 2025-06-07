import { config } from "@/app/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const db = drizzle<typeof schema>(config.DATABASE_URL, { schema });
