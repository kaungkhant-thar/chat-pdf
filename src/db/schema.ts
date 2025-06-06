import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const documentsTable = pgTable("documents", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fileName: varchar().notNull(),
  fileSize: integer().notNull(),
  fileKey: varchar().notNull(),

  createdAt: date().defaultNow(),
});
