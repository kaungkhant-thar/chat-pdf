"use client";

import React from "react";
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

const UploadPdf = () => {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    processFile(file);
  };

  const processFile = async (file: File) => {
    const { presignedUrl, fileKey } = await generatePresignedUrl(
      file.name,
      file.type
    );
    await uploadFile(file, presignedUrl);

    await embedPdfToPipecone(fileKey);
    console.log("Done");
  };

  const uploadFile = async (file: File, presignedUrl: string) => {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    console.log("File uploaded successfully:", response);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>UploadPdf</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>

          <div
            {...getRootProps()}
            className="flex flex-col items-center border-dashed border-2 border-gray-300 p-6 rounded-lg text-center"
          >
            <input {...getInputProps()} />

            <UploadCloud />

            <p>Drag and drop a PDF file here or click </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdf;
