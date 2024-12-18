import { checkRole } from "@/lib/roles";
import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  // Dynamically set redirect URL after login
  const isAdmin = await checkRole("admin");
  const redirectUrl = isAdmin ? "/admin" : "/";
  console.log(redirectUrl);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SignIn forceRedirectUrl={redirectUrl} />
    </div>
  );
}
