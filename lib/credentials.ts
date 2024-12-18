"use server";

import bcrypt from "bcrypt";

const saltRounds = 10; // Typically a value between 10 and 12

export async function saltAndHashPassword(plainPassword: string) {
  let salt;
  try {
    salt = await bcrypt.genSalt(saltRounds);
  } catch (err: any) {
    throw new Error("Error generating salt: " + err.message);
  }
  try {
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (err: any) {
    throw new Error("Error hashing password: " + err.message);
  }
}

// Function to verify a password
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (err: any) {
    throw new Error("Error verifying password: " + err.message);
  }
}
