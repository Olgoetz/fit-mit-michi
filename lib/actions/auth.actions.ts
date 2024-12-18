"use server";

import z from "zod";
import { createServerAction, ZSAError } from "zsa";
import prisma from "../prisma";
import { saltAndHashPassword } from "../credentials";
import { createAccountSchema } from "@/schemas/auth.schema";
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
