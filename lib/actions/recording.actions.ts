"use server";

import { recordingSchema } from "@/schemas/recording.schema";
import z from "zod";
import { createServerAction } from "zsa";
import prisma from "../prisma";
import { formatToCurrency } from "../utils";
import { auth } from "@clerk/nextjs/server";
import { Recording } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createRecording = createServerAction()
  .input(recordingSchema)
  .handler(async ({ input }) => {
    const { userId }: { userId: string | null } = await auth();
    if (!userId) {
      throw new Error("Nicht authentifiziert");
    }

    console.log("input", input);

    try {
      await prisma.recording.create({
        data: {
          userId,
          ...input,
        },
      });
    } catch (error: any) {
      console.error("Fehler beim Erstellen der Aufnahme:", error);
      throw new Error("Fehler beim Erstellen der Aufnahme");
    }

    revalidatePath("/admin/aufzeichnungen");
    revalidatePath("/kurse");
    redirect("/admin/aufzeichnungen");
  });

/**
 * Get all recordings
 *
 * @returns {Promise<Recording[]>} Array of recordings
 *
 */
export const getRecordings = async ({
  onlyPublished = false,
}: {
  onlyPublished?: boolean;
} = {}): Promise<Recording[]> => {
  // const { userId }: { userId: string | null } = auth();
  // if (!userId) {
  //   throw new Error("Nicht authentifiziert");
  // }

  //const query = onlyPublished ? { userId, isPublished: true } : { userId };
  const query = onlyPublished ? { isPublished: true } : {};
  const recordings = await prisma.recording.findMany({
    where: query,
  });
  return recordings;
};

/**
 * Get all recordings
 *
 * @returns {Promise<Recording>} - Recording
 *
 */
export const getRecordingById = async (id: string): Promise<Recording> => {
  const recording = await prisma.recording.findUnique({
    where: { id },
  });
  if (!recording) {
    throw new Error("Aufzeichnung nicht gefunden");
  }
  return recording;
};

/**
 * Duplicate a recording
 *
 * @returns {Promise<Recording>} - New recording
 *
 */
export const duplicateRecording = async (id: string): Promise<Recording> => {
  const { userId }: { userId: string | null } = await auth();
  if (!userId) {
    throw new Error("Nicht authentifiziert");
  }
  const recording = await prisma.recording.findUnique({
    where: { id, userId },
  });
  if (!recording) {
    throw new Error("Aufzeichnung nicht gefunden");
  }
  const { id: _, ...rest } = recording;
  const newRecording = await prisma.recording.create({
    data: {
      ...rest,
      title: `${recording.title} (Kopie)`,
    },
  });

  revalidatePath("/admin/aufzeichnungen");
  revalidatePath("/kurse");
  return newRecording;
};

/**
 * Delete a recording
 *
 * @returns {Promise<Recording>} - Delete recording
 *
 */
export const deleteRecording = async (id: string): Promise<Recording> => {
  const { userId }: { userId: string | null } = await auth();
  if (!userId) {
    throw new Error("Nicht authentifiziert");
  }
  const recording = await prisma.recording.findUnique({
    where: { id, userId },
  });
  if (!recording) {
    throw new Error("Aufzeichnung nicht gefunden");
  }
  try {
    await prisma.recording.delete({ where: { id } });
  } catch (error: any) {
    console.error("Fehler beim Löschen der Aufnahme:", error);
    throw new Error("Fehler beim Löschen der Aufnahme");
  }

  revalidatePath("/admin/aufzeichnungen");
  revalidatePath("/kurse");
  return recording;
};

const editSchema = recordingSchema.extend({ id: z.string() });

/**
 * Edit a recording
 *
 * @returns null
 *
 */
export const editRecording = createServerAction()
  .input(editSchema)
  .handler(async ({ input }) => {
    const { userId }: { userId: string | null } = await auth();
    if (!userId) {
      throw new Error("Nicht authentifiziert");
    }

    const { id, ...rest } = input;
    try {
      await prisma.recording.update({
        where: { id },
        data: {
          ...rest,
        },
      });
    } catch (error: any) {
      console.error("Fehler beim Bearbeiten der Aufnahme:", error);
      throw new Error("Fehler beim Bearbeiten der Aufnahme");
    }

    revalidatePath("/admin/aufzeichnungen");
    revalidatePath("/kurse");
    redirect("/admin/aufzeichnungen");
  });
