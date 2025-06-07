import Chat from "@/components/chat";
import PdfViewer from "@/components/pdf-viewer";
import { getDocumentById } from "@/db/actions";
import { getS3FileUrl } from "@/lib/s3";
import React from "react";

const ChatPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const document = await getDocumentById(id);
  const fileUrl = await getS3FileUrl(document.fileKey);

  return (
    <div className=" flex">
      <PdfViewer fileUrl={fileUrl} />
      <Chat document={document} />
    </div>
  );
};

export default ChatPage;
