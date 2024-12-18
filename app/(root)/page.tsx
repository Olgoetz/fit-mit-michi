import AboutMe from "@/components/AboutMe";
import UserAuthForm from "@/components/authentication/user-register-form";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Offer from "@/components/Offer";
import Prices from "@/components/Prices";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  // console.log(process.env);
  return (
    <main className="flex flex-col min-h-screen  ">
      <Header />
      <Offer />
      <Prices />
      <AboutMe />
      <ContactForm />
    </main>
  );
}
