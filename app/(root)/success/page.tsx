import Confetti from "@/components/Confetti";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <main className="h-screen flex items-center justify-center bg-gray-50">
      <Confetti speed={3} />
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Viel Dank für Deine Buchung!
        </h1>
        <p className="text-lg text-gray-600">
          Wir verarbeiten gerade deine Bezahlung. Du erhälst in Kürze eine
          Bestätigung per E-Mail.
        </p>
        <Button asChild>
          <Link href={"/kurse"}>Zurück zu den Kursen</Link>
        </Button>
      </div>
    </main>
  );
};

export default Page;
