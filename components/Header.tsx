// components/Header.js
"use client";
import { Button } from "@/components/ui/button"; // shadcn Button-Komponente
import { AuroraBackground } from "./ui/aurora-background";
import { motion } from "framer-motion";
import Link from "next/link";
import ActionButton from "./ActionButton";
const Header = () => {
  return (
    <AuroraBackground className="bg-gradient-to-r from-pink-700 to-pink-300">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        {/* <header className="relative w-full h-screen bg-gradient-to-r from-pink-700 to-pink-300 p-8"> */}
        {/* <div className="container mx-auto flex flex-col justify-center items-center h-full text-center"> */}
        <h1 className="text-3xl md:text-7xl font-bold text-white text-center">
          Get in Shape!
        </h1>
        <p className="font-extralight text-base md:text-4xl text-center py-4">
          Nimm jederzeit und überall an meinen On-Demand- und Live-Fitnesskursen
          teil.
        </p>
        {/* <Button
          asChild
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
        > */}
        <ActionButton link="#angebot" buttonText="Zum Angebot" />
        {/* <Link href={"/#angebot"}>Zum Angebot</Link> */}
        {/* </Button> */}
        {/* </div> */}
        {/* Optional: Hintergrundbild */}
        {/* <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/images/fitness-header.jpg')" }}
          ></div> */}
        {/* </header> */}
      </motion.div>
    </AuroraBackground>
  );
};

export default Header;
