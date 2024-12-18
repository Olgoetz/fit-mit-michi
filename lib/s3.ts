"use server";

import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { formatForUrl } from "./utils";

const s3Client = new S3Client({ region: "eu-central-1" });

const S3_BUCKET = process.env.S3_BUCKET;

/**
 * Create a presigned URL for an S3 operation
 *
 * @param {any} command - S3 command object
 * @param {number} expiresIn - Expiry time for the presigned URL
 * @returns {string} presigned URL
 *
 */
const createPresignedUrl = async (
  command: any,
  expiresIn: number
): Promise<string> => {
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
  return signedUrl;
};

/**
 * Function to generate a presigned URL for getting an object from S3
 *
 * @param {string} fileName - File name of the object to get
 * @returns {string} presigned URL
 *
 */
export const generatePresignedGetUrl = async (
  fileName: string,
  responseContentType: string,
  path?: string
): Promise<string> => {
  let key;
  if (!path) {
    key = fileName;
  } else {
    key = `${path}/${fileName}`;
  }

  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    ResponseContentType: responseContentType,
  });

  const signedUrl = await createPresignedUrl(command, 3600);

  return signedUrl;
};

/**
 * Function to generate a presigned URL for uploading an object from S3
 *
 * @param {string} fileName - File name of the object to get
 * @returns {string} presigned URL
 *
 */
export const generatePresignedUploadUrl = async (
  fileName: string,
  contentType: string,
  path?: string
): Promise<string> => {
  const cleanedFileName = fileName.replace(" ", "_").replace("&", "und");

  //const encodedKey = encodeURIComponent(cleanedFileName);

  let key;
  if (!path) {
    key = fileName;
  } else {
    key = `${path}/${formatForUrl(fileName)}`;
  }
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    ContentType: contentType,
    ACL: "public-read",
  });

  const signedUrl = await createPresignedUrl(command, 300);

  return signedUrl;
};

// Function to delete an object from S3 using a presigned URL
export const deleteObjectWithPresignedUrl = async (fileName: string) => {
  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileName,
  });

  const signedUrl = await createPresignedUrl(command, 30);

  try {
    await axios.delete(signedUrl);
  } catch (err) {
    console.error("Error deleting object: ", err);
    return {
      success: false,
      message: "Fehler beim Löschen des Videos!",
    };
  }

  revalidatePath("/dashboard");
  return {
    success: true,
    message: "Video gelöscht!",
  };
};

// Function to list all objects in the S3 bucket
export const listVideos = async () => {
  const command = new ListObjectsV2Command({
    Bucket: S3_BUCKET,
  });

  const data = await s3Client.send(command);
  // console.log("Retrieved objects from s3: ", data);
  const videos = data.Contents?.map((video) => video.Key);
  revalidatePath("/dashboard");
  return videos;
};
