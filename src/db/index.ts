import { config } from "@/app/config";
import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(config.DATABASE_URL);
