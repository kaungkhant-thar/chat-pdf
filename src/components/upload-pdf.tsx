"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { UploadCloud } from "lucide-react";
import { generatePresignedUrl } from "@/lib/s3";
import { embedPdfToPipecone } from "@/lib/pipecone";
import { saveDocument } from "@/db/actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const UploadPdf = ({ numOfDocuments }: { numOfDocuments: number }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    if (numOfDocuments >= 3) {
      toast.error("You can only upload up to 3 documents.");
      setIsDialogOpen(false);
      return;
    }
    const file = acceptedFiles[0];
    processFile(file);
  };

  const processFile = async (file: File) => {
    setIsUploading(true);
    setIsComplete(false);

    try {
      const { presignedUrl, fileKey } = await generatePresignedUrl(
        file.name,
        file.type
      );

      await uploadFile(file, presignedUrl);

      await embedPdfToPipecone(fileKey);

      await saveDocument({
        fileName: file.name,
        fileKey: fileKey,
        fileSize: file.size,
      });

      setIsComplete(true);
      console.log("Done");

      setTimeout(() => {
        setIsDialogOpen(false);
      }, 400);
    } catch (error) {
      console.error("Error during file processing", error);
      setIsUploading(false);
      setIsComplete(false);
    }
  };

  const uploadFile = async (file: File, presignedUrl: string) => {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    console.log("Response from S3 upload:", response);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>

          <div
            {...getRootProps()}
            className="flex flex-col items-center border-dashed border-2 border-gray-300 p-6 rounded-lg text-center"
          >
            <input {...getInputProps()} />
            <UploadCloud className="text-primary" />
            <p>Drag and drop a PDF file here or click</p>

            {/* Loading Spinner */}
            {isUploading && !isComplete && (
              <div className="mt-4 flex flex-col items-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <p className="text-sm text-gray-500">Uploading...</p>
              </div>
            )}

            {/* Success Message */}
            {isComplete && (
              <div className="mt-4 text-green-500">
                <p>Upload complete! The document is ready for processing.</p>
              </div>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdf;
