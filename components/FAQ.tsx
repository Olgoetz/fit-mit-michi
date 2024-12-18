import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Image from "next/image";

const accordionItems = [
  {
    label: "Was benötige ich, um an einem Live-Online-Kurs teilzunehmen?",
    content:
      "Du benötigst lediglich eine stabile Internetverbindung und ein Endgerät (z.B. Laptop, Tablet oder Smartphone).",
  },
  {
    label: "Wie kann ich mich für einen Kurs anmelden?",
    content:
      "Du kannst dich ganz einfach für einen Kurs unter dem Menüpunkt 'Kurse' anmelden. Dort findest du alle Kurse, sowohl Live-Streams als auch on-demand Videos.",
  },
  {
    label: "Kann ich auch ohne Kamera am Kurs teilnehmen?",
    content:
      "Ja, du kannst auch ohne Kamera am Kurs teilnehmen. Es ist jedoch empfehlenswert, damit ich dich besser korrigieren kann.",
  },
  {
    label:
      "Ich habe mich für eine Mitgliedschaft entschieden. Wie kann ich kündigen?",
    content:
      "Melde dich zunächst mit deinem Account an. Dann kannst Du deine Mitgliedschaft ganz einfach über den Menüpunkt 'Mitgliedschaft' kündigen.",
  },
];

const FAQ = () => {
  return (
    <div>
      <Accordion type="single" collapsible className="space-y-4">
        {accordionItems.map((item) => (
          <AccordionItem key={item.label} value={item.label}>
            <AccordionTrigger className="md:text-lg text-sm text-left font-semibold pb-4">
              {item.label}
            </AccordionTrigger>
            <AccordionContent className="md:text-sm text-xs text-left">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="my-20 relative md:h-[600px] h-[300px] w-full">
        <Image
          src="/michi_mobility.jpg"
          alt="Michaela Workout"
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default FAQ;
