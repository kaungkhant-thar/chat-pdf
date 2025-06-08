import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const documentsTable = pgTable("documents", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fileName: varchar().notNull(),
  fileSize: integer().notNull(),
  fileKey: varchar().notNull(),

  createdAt: date().defaultNow(),
});

export const rolesEnum = pgEnum("roles", ["user", "assistant"]);

export const messagesTable = pgTable("messages", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  role: rolesEnum().notNull(),
  content: text().notNull(),
  documentId: integer()
    .notNull()
    .references(() => documentsTable.id, {
      onDelete: "cascade",
    }),
  createdAt: date().defaultNow(),
});

export const documentsRelations = relations(documentsTable, ({ many }) => ({
  messages: many(messagesTable),
}));

export const messagesRelations = relations(messagesTable, ({ one }) => ({
  document: one(documentsTable, {
    fields: [messagesTable.documentId],
    references: [documentsTable.id],
  }),
}));
