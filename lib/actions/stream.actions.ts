"use server";

import { streamSchema } from "@/schemas/stream.schema";
import z from "zod";
import { createServerAction } from "zsa";
import prisma from "../prisma";
import { formatToCurrency } from "../utils";

import { Stream } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const createSchema = streamSchema
  .omit({ imageFile: true })
  .extend({ imageUrl: z.string() });

export const createStream = createServerAction()
  .input(createSchema)
  .handler(async ({ input }) => {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Nicht authentifiziert");
    }

    await prisma.stream.create({
      data: {
        userId,
        ...input,
      },
    });
    console.log("Stream created!");

    revalidatePath("/admin/streams");
    revalidatePath("/kurse");
    redirect("/admin/streams");
  });

/**
 * Get all streams
 *
 * @returns {Promise<Stream[]>} - Array of streams
 *
 */
export const getStreams = async (
  onlyPublished: boolean = false
): Promise<Stream[]> => {
  const query = onlyPublished ? { isPublished: true } : {};
  const streams = await prisma.stream.findMany({ where: query });
  return streams;
};

/**
 * Get a stream by its id
 *
 * @returns {Promise<stream>} - stream
 *
 */
export const getStreamById = async (id: string): Promise<Stream> => {
  const stream = await prisma.stream.findUnique({ where: { id } });
  if (!stream) {
    throw new Error("Stream nicht gefunden");
  }
  return stream;
};

/**
 * Duplicate a stream
 *
 * @returns {Promise<stream>} - New stream
 *
 */
export const duplicateStream = async (id: string): Promise<Stream> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Nicht authentifiziert");
  }

  const stream = await prisma.stream.findUnique({ where: { id } });
  if (!stream) {
    throw new Error("Stream nicht gefunden");
  }
  const { id: _, ...rest } = stream;
  const newstream = await prisma.stream.create({
    data: {
      ...rest,
      title: `${stream.title} (Kopie)`,
    },
  });

  revalidatePath("/admin/aufzeichnungen");
  revalidatePath("/kurse");
  return newstream;
};

/**
 * Delete a stream
 *
 * @returns {Promise<stream>} - Delete stream
 *
 */
export const deleteStream = async (id: string): Promise<Stream> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Nicht authentifiziert");
  }

  const stream = await prisma.stream.findUnique({ where: { id } });
  if (!stream) {
    throw new Error("Stream nicht gefunden");
  }
  try {
    await prisma.stream.delete({ where: { id } });
  } catch (error: any) {
    console.error("Fehler beim Löschen der Aufnahme:", error);
    throw new Error("Fehler beim Löschen der Aufnahme");
  }

  revalidatePath("/admin/streams");
  revalidatePath("/kurse");
  return stream;
};

const editSchema = streamSchema
  .omit({ imageFile: true })
  .extend({ imageUrl: z.string() })
  .extend({ id: z.string() });

/**
 * Edit a stream
 *
 * @returns null
 *
 */
export const editStream = createServerAction()
  .input(editSchema)
  .handler(async ({ input }) => {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Nicht authentifiziert");
    }

    const { id, ...rest } = input;
    try {
      await prisma.stream.update({
        where: { id },
        data: {
          ...rest,
        },
      });
    } catch (error: any) {
      console.error("Fehler beim Bearbeiten des Streams:", error);
      throw new Error("Fehler beim Bearbeiten des Streams");
    }

    revalidatePath("/admin/streams");
    revalidatePath("/kurse");

    redirect("/admin/streams");
  });
