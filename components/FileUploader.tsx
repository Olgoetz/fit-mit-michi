"use client";

import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Image, VideoIcon, X } from "lucide-react";
import { BarLoader } from "react-spinners";
import { IMAGE_MAX_UPLOAD_SIZE } from "@/constants";

import { toast } from "sonner";
import { FileUploaderProps } from "@/types";
import { generatePresignedUploadUrl } from "@/lib/s3";
import { formatForUrl, waitor } from "@/lib/utils";
import axios from "axios";

//const controller = new AbortController();
export default function FileUploader({
  type,
  onUploadComplete,
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Persist AbortController instance across renders
  const controllerRef = useRef<AbortController | null>(null);

  let acceptedFileType;
  if (type === "image") {
    acceptedFileType = { "image/*": ["*.png", "*.jpg", ".jpeg"] };
  } else {
    acceptedFileType = { "video/*": ["*.mp4"] };
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Do something with the files
      setFiles(acceptedFiles);
      const file = acceptedFiles[0];

      if (file.size > IMAGE_MAX_UPLOAD_SIZE && type === "image") {
        setFiles([]);
        toast.error(
          `Bild ist zu groß. Es muss kleiner als ${
            IMAGE_MAX_UPLOAD_SIZE / (1024 * 1024)
          } MB sein`,
          { position: "top-center" }
        );
        return;
      }

      // // Create a new AbortController for the upload
      controllerRef.current = new AbortController();

      // Upload the file
      try {
        // Get the upload url
        const uploadUrl = await generatePresignedUploadUrl(
          file.name,
          file.type,
          type
        );
        console.log("Upload URL: ", uploadUrl);
        const result = await axios.put(uploadUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
          signal: controllerRef.current.signal, // Attach the signal

          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) {
              return;
            }
            setUploadProgress(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          },
        });
        // const result = await fetch(uploadUrl, {
        //   method: "PUT",
        //   body: file,
        // });
        console.log("Result: ", result);
        const fileUrl = `https://${
          process.env.NEXT_PUBLIC_S3_BUCKET
        }.s3.eu-central-1.amazonaws.com/${type}/${formatForUrl(file.name)}`;

        onUploadComplete(fileUrl);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Upload canceled");
          toast.error("Upload abgebrochen", { position: "top-center" });
        } else {
          console.error("Error uploading file: ", error);
          toast.error("Fehler beim Hochladen des Bildes", {
            position: "top-center",
          });
        }
      } finally {
        setUploadProgress(0);
        setFiles([]);
        // controllerRef.current = null; // Reset controller
      }

      // onUploadComplete(URL.createObjectURL(file));
    },
    [type, onUploadComplete]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: acceptedFileType,
  });

  return (
    <div {...getRootProps()} className="w-full">
      <input {...getInputProps()} />

      <Button type="button" size="lg" className="w-full">
        {type === "image" ? (
          <>
            <Image size={24} className="mr-4" />
            <p>Bild hinzufügen</p>
          </>
        ) : (
          <>
            <VideoIcon size={24} className="mr-4" />
            <p>Video hinzufügen</p>
          </>
        )}
      </Button>
      {files.length > 0 && (
        <div className="fixed bottom-10 right-10 bg-slate-100 p-6 z-50 rounded-lg space-y-2">
          <h4 className="text-xl">Uploading</h4>
          <div className="flex items-center  gap-3">
            <div>
              <p className="text-xs">{files[0].name}</p>
              <BarLoader width={100} />
              {uploadProgress} %
            </div>
            <Button
              type="button"
              className="w-6 h-6 rounded-full bg-red-300 p-1"
              onClick={(e) => {
                if (controllerRef.current) {
                  controllerRef.current.abort();
                }

                e.stopPropagation();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
