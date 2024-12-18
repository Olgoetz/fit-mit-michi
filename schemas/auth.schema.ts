import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email ist ungültig" }),
  password: z.string().min(1, { message: "Passwort wird benötigt" }),
});

export const createAccountSchema = z
  .object({
    foreName: z.string().min(3, { message: "Vorname wird benötigt" }),
    lastName: z.string().min(3, { message: "Nachname wird benötigt" }),
    email: z.string().email({ message: "Email ist ungültig" }),
    password: z
      .string()
      .min(8, { message: "Passwort muss mindestens 8 Zeichen lang sein" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwörter stimmen nicht überein",
    path: ["confirmPassword"],
  });
