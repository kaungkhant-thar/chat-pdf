import { config } from "@/app/config";
import { saveMessage } from "@/db/actions";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { LangChainAdapter } from "ai"; // ✅ Make sure this is imported

export const maxDuration = 60;

export async function POST(request: Request) {
  const { fileKey, documentId, messages } = await request.json();

  const query = messages[messages.length - 1].content;

  await saveMessage({
    role: "user",
    content: query,
    documentId: parseInt(documentId),
  });

  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.Index(config.PINECONE_INDEZ_NAME);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      pineconeIndex,
      namespace: fileKey,
    }
  );

  const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
    streaming: true,
  });

  const prompt = ChatPromptTemplate.fromTemplate(
    `Answer the user's question based on the context below:\n\n{context}\n\nQuestion: {input}`
  );

  const combineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt,
  });

  const retriever = vectorStore.asRetriever();

  const retrievalChain = await createRetrievalChain({
    retriever,
    combineDocsChain,
  });

  const rawStream = await retrievalChain.stream({ input: query });

  let fullAnswer = "";

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of rawStream) {
        const token = chunk?.answer ?? "";
        fullAnswer += token;
        controller.enqueue(token);
      }
      controller.close();

      if (fullAnswer) {
        await saveMessage({
          role: "assistant",
          content: fullAnswer,
          documentId: parseInt(documentId),
        });
      }
    },
  });

  // ✅ Fix: use LangChainAdapter to return the stream properly
  return LangChainAdapter.toDataStreamResponse(stream);
}
