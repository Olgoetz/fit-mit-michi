import { Roles } from "@/types/global";
import { auth } from "@clerk/nextjs/server";

/** 
  This function checks if the user has the give role
  @param role: string
  @returns boolean
 */
export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
};
