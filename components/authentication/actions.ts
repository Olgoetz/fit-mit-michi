"use server";

import z from "zod";
import { createServerAction, ZSAError } from "zsa";
import prisma from "@/lib/prisma";
import { saltAndHashPassword } from "@/lib/credentials";

const createAccountSchema = z
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

export const createAccount = createServerAction()
  .input(createAccountSchema, {
    type: "formData",
  })
  .handler(async ({ input }) => {
    // await new Promise((resolve) => setTimeout(resolve, 500));
    const { foreName, lastName, email, password } = input;

    await registerUser({ foreName, lastName, email, password });
    //return "Hello, " + input;
  });

interface registerUserProps {
  foreName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function registerUser({
  foreName,
  lastName,
  email,
  password,
}: registerUserProps) {
  try {
    // Check is user already exists
    const existinguser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existinguser) {
      throw new Error("Nutzer existiert bereits");
    }

    // Create user
    const hashedPassword = await saltAndHashPassword(password);
    await prisma.user.create({
      data: {
        foreName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
  } catch (err: any) {
    console.error("[ERROR]", err.message);
    throw new ZSAError("INTERNAL_SERVER_ERROR", err.message);
  }
}
