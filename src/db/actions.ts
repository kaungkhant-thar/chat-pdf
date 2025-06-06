"use server";
import { documentsTable } from "./schema";
import { db } from ".";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const saveDocument = async ({
  fileKey,
  fileName,
  fileSize,
}: {
  fileName: string;
  fileKey: string;
  fileSize: number;
}) => {
  const document: typeof documentsTable.$inferInsert = {
    fileKey,
    fileName,
    fileSize,
  };
  console.log("Saving document:", document);
  const response = await db.insert(documentsTable).values(document);
  console.log("Document saved:", response);

  revalidatePath("/documents");
};

export const getDocuments = async () => {
  const documents = await db.select().from(documentsTable);

  return documents;
};

export const getDocumentById = async (id: string) => {
  const document = await db
    .select()
    .from(documentsTable)
    .where(eq(documentsTable.id, parseInt(id)));

  console.log("Document by ID:", document);
  return document[0];
};
