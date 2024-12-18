import {
  Purchase as PrismaPurchase,
  Recording as PrismaRecording,
  Stream as PrismaStream,
} from "@prisma/client";

declare global {
  type Recording = PrismaRecording;
  type Stream = PrismaStream;
  type Purchase = PrismaPurchase;
}

// Create a type for the roles
export type Roles = "admin";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}

export {};
