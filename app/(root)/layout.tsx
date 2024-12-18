import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import { isUserSubscribed } from "@/lib/actions/subscription.actions";
import { auth } from "@clerk/nextjs/server";
import { is } from "date-fns/locale";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await auth();

  const subscription = await isUserSubscribed();
  return (
    <main>
      <Navbar
        userId={user.userId}
        stripeCustomerId={subscription.stripeCustomerId}
        validSubscription={subscription.validSubscription}
      />
      <NavbarMobile
        userId={user.userId}
        stripeCustomerId={subscription.stripeCustomerId}
        validSubscription={subscription.validSubscription}
      />
      {children}
    </main>
  );
}
