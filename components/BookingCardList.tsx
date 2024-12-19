import React from "react";
import BookingCard from "./BookingCard";
import { log } from "@/lib/logger";
import { BookingCardListProps } from "@/types";
import BookingSubscriptionCard from "./BookingSubscriptionCard";

export default async function BookingCardList({
  query,
  items,
  isSubscribed,
}: BookingCardListProps) {
  if (!items) {
    return (
      <div className="flex h-screen justify-center items-center text-xl ">
        Keinen Kurs gefunden!
      </div>
    );
  }
  const filtered = items.filter((i) =>
    i.title.toLocaleLowerCase().includes(query)
  );
  // log({
  //   level: "debug",
  //   filePath: "/components/BookingCardList.tsx",
  //   message: "Filtered items",
  //   data: filtered,
  // });

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4">
        {!isSubscribed
          ? filtered.map((item) => <BookingCard key={item.id} item={item} />)
          : filtered.map((item) => (
              <BookingSubscriptionCard key={item.id} item={item} />
            ))}
      </div>
    </div>
  );
}
