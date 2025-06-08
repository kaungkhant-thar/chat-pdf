import UploadPdf from "@/components/upload-pdf";
import { getDocuments } from "@/db/actions";
import Link from "next/link";
import React from "react";

const Documents = async () => {
  const documents = await getDocuments();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start space-y-2">
          <h1 className="text-3xl font-bold text-primary">📄 Documents</h1>
          <p className="text-muted-foreground">Upload and view PDF files.</p>
        </div>

        <UploadPdf numOfDocuments={documents.length} />
      </div>

      <div className="space-y-4">
        {documents.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No documents uploaded yet.
          </p>
        ) : (
          <ul className="flex flex-col space-y-2">
            {documents.map((doc) => (
              <li key={doc.fileKey}>
                <Link
                  href={`/documents/${doc.id}`}
                  className="block p-4 rounded-lg border border-neutral-200 bg-white hover:shadow-md transition"
                >
                  <p className="text-base font-medium text-primary">
                    {doc.fileName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(doc.fileSize / 1024).toFixed(1)} KB
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Documents;
