"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import { generatePresignedUploadUrl } from "@/lib/s3";

interface FileUploadProps {
  onUploadComplete: (FileUrl: string) => void;
  type: "images" | "videos";
}

const FileUploader = ({ onUploadComplete, type }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    // if (!selectedFile) return;

    setIsUploading(true);

    const fileName = file.name;
    const contentType = file.type;

    const uploadUrl = await generatePresignedUploadUrl(
      fileName,
      contentType,
      type
    );

    await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": contentType,
      },
      onUploadProgress: (progressEvent) => {
        let progress = Math.round(
          (progressEvent.loaded / progressEvent.total!) * 100
        );
        setUploadProgress(progress);
      },
    });

    const fileUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.eu-central-1.amazonaws.com/${type}/${fileName}`;
    onUploadComplete(fileUrl);

    setIsUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept={type === "images" ? "image/*" : "video/*"}
        ref={inputRef}
        onChange={handleFileSelection}
        className="hidden"
      />
      <Button type="button" onClick={() => inputRef.current?.click()}>
        {type === "images" ? "Bild" : "Video"} auswählen
      </Button>

      <div className="mx-auto">
        {isUploading && (
          <>
            <Loader2Icon className="size-5 animate-spin mr-2" />
            {uploadProgress}%
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
