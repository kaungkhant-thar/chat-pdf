"use server";
import { documentsTable, messagesTable } from "./schema";
import { db } from ".";
import { revalidatePath } from "next/cache";

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
  const documentWithMessages = await db.query.documentsTable.findFirst({
    where: (documents, { eq }) => eq(documents.id, parseInt(id)),
    with: {
      messages: true,
    },
  });
  if (!documentWithMessages) {
    throw new Error(`Document with id ${id} not found`);
  }
  return documentWithMessages;
};

export const saveMessage = async (
  message: typeof messagesTable.$inferInsert
) => {
  const response = await db.insert(messagesTable).values(message);
  console.log("Message saved:", response);
  return response;
};
