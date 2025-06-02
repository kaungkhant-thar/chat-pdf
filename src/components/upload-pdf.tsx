"use client";

import React, { useCallback } from "react";
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

const UploadPdf = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

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
