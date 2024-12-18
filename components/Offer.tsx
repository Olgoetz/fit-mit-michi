import React from "react";
import OfferCard from "./OfferCard";
import PriceCard from "./Prices";
import CoursesButton from "./ActionButton";
import ActionButton from "./ActionButton";

const Offer = () => {
  return (
    <section id="angebot" className="mb-24 container mx-auto max-w-[1200px] ">
      <div className="mt-20 pb-12">
        <h2 className="text-2xl md:text-4xl font-bold">Mein Angebot</h2>
        <p className="text-pink-500 text-base">
          Buche Streams oder on-demand Videos
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <OfferCard
          imagePath="/michi_workout.jpg"
          title="Live-Streams"
          description="Trainere live mit mir und anderen Teilnehmern - Ich biete verschiedene Kurse an, sodass für jeden etwas dabei ist. Die Kurse finden regelmäßig statt, entweder vormittags oder nachmittags. Du kannst dich via Zoom zuschalten."
        />
        <OfferCard
          imagePath="/michi_mobility.jpg"
          title="On-Demand"
          description="Trainiere wo und wann Du willst - Neben den Live-Streams kannst Du auch auf eine Vielzahl von on-demand Videos zugreifen. Jeden Live-Stream zeichne ich auf, sodass Du ihn später noch anschauen kannst. Zusätzlich biete ich Dir noch Videos von profressionellen Drehs an."
        />
      </div>
    </section>
  );
};

export default Offer;
