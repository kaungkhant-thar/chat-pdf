import UploadPdf from "@/components/upload-pdf";
import { getDocuments } from "@/db/actions";
import Link from "next/link";
import React from "react";

const Documents = async () => {
  const documents = await getDocuments();
  console.log("Documents:", documents);
  return (
    <div className=" max-w-4xl mx-auto p-10">
      Documents
      <UploadPdf />
      <ul>
        {documents.map((doc) => (
          <li key={doc.fileKey}>
            <Link href={`/documents/${doc.id}`}>
              <p>
                {doc.fileName} - {doc.fileSize} bytes
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;
