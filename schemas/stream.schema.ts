import * as z from "zod";
import { IMAGE_MAX_UPLOAD_SIZE, IMAGE_ACCEPTED_FILE_TYPES } from "@/constants";

export const streamSchema = z.object({
  title: z
    .string({ required_error: "Titel erforderlich" })
    .min(1, { message: "Titel erforderlich" }),

  description: z.string({ message: "Beschreibung erforderlich" }).min(20, {
    message: "Beschreibung muss mindestens 20 Zeichen beinhalten.",
  }),

  zoomLink: z
    .string({ message: "URL erforderlich" })
    .url({ message: "Gültige URL erforderlich" }),
  meetingId: z
    .string({ required_error: "Meeting ID erforderlich" })
    .min(1, { message: "Meeting ID erforderlich" }),
  meetingPassword: z
    .string({ required_error: "Password erforderlich" })
    .min(1, { message: "Password erforderlich" }),

  price: z.coerce.number({ required_error: "Preis erforderlich" }),
  duration: z.coerce.number({ required_error: "Dauert erforderlich" }),
  startDate: z.date({ message: "Datum erforderlich" }),
  imageFile: z
    .instanceof(File, { message: "Bild muss eine Datei sein" })
    .refine((file) => {
      return file.size <= IMAGE_MAX_UPLOAD_SIZE;
    }, "Bild muss kleiner als 5MB sein")
    .refine((file) => {
      return IMAGE_ACCEPTED_FILE_TYPES.includes(file.type);
    }, "Bild muss vom Typ JPEG oder PNG sein")
    .optional(),
  imageUrl: z.string(),
  isAvailableForSubscribers: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});
