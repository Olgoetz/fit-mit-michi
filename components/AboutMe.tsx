"use client";

import React, { useActionState, useEffect } from "react";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { sendContactMessage } from "@/lib/actions/contact.actions";

import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { FormError } from "./FormError";
import { Label } from "./ui/label";
import ImageCarousel from "./ImageCarousel";

const AboutMe = () => {
  return (
    <section
      id="ueber-mich"
      className="mb-24 p-8 container mx-auto max-w-[1200px] "
    >
      <div className=" pb-12">
        <h2 className="text-2xl md:text-4xl font-bold">Über mich</h2>
        <p className="text-pink-500 text-base">
          Das Hobby und die Leidenschaft zum Beruf gemacht
        </p>
      </div>
      <div className="grid md:grid-cols-2 w-full gap-y-8 items-center justify-center">
        <div className="text-muted-foreground font-light text-justify">
          <p>
            <span className="font-bold ">
              Motivation, Power und Lebensfreude...{" "}
            </span>{" "}
            das sind die Schlagworte mit denen mich meine Freunde, Kurs- sowie
            Camp Teilnehmer beschreiben. Diese Energie bringe ich
            leidenschaftlich mit in meine Group Fitness Kurse und Events. Ich
            versuche immer jeden einzelnen Teilnehmer, mit meiner positiven
            Ausstrahlung und Leidenschaft, mitzureissen und zudem auch zu
            motivieren neue Dinge auszuprobieren.
          </p>
          <p className="my-4">
            Schon immer war Sport und vor allem Tanz eine Passion von mir. Diese
            wurde schließlich so groß, dass ich meinen Bürojob als
            Industriekauffrau an den Nagel hing und mein Hobby und meine
            Leidenschaft letztendlich zum Beruf machte. Nach meiner Ausbildung
            zum Group Fitness Instructor folgten weitere Workshops und Fort- und
            Ausbildungen im Bereich Fitness, bis hin zu einer einjährigen
            Tanzausbildung in New York.
          </p>
          <p>
            Seit meiner abgeschlossenen Ausbildung im Group Fitness Bereich im
            Jahr 1999/2000 unterrichte ich jetzt schon erfolgreich
            verschiedenste Kurse im Group Fitness Bereich in namhaften Fitness
            Studios in München, in meinen eigenen Camps/Retreats, Kongressen
            sowie auf Robinson Events. Zudem bin ich noch als Personaltrainerin
            live und online tätig.
          </p>
        </div>
        <div className="mx-auto">
          <ImageCarousel />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
