import AboutMe from "@/components/AboutMe";

import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Offer from "@/components/Offer";
import Prices from "@/components/Prices";

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
