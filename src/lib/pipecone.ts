"use server";

import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { awsConfig } from "@/app/config/aws";

export const embedPdfToPipecone = async (fileKey: string) => {
  const response = await fetch(
    `https://${awsConfig.s3BucketName}.s3.${awsConfig.region}.amazonaws.com/${fileKey}`
  );
  const blob = await response.blob();

  const loader = new WebPDFLoader(blob);
  const docs = await loader.load();

  const trimmedDocs = docs.map((doc) => {
    const metadata = { ...doc.metadata };
    delete metadata.pdf;

    return {
      pageContent: doc.pageContent,
      metadata: metadata,
    };
  });

  const splitter = new CharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 10,
    separator: " ",
  });

  const splitDocs = await splitter.splitDocuments(trimmedDocs);

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });
  console.log("Pinecone initialized");
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEZ_NAME!);
  console.log("adding to pinecone index", process.env.PINECONE_INDEZ_NAME);
  await PineconeStore.fromDocuments(splitDocs, new OpenAIEmbeddings(), {
    pineconeIndex,
    namespace: fileKey,
  });
};
