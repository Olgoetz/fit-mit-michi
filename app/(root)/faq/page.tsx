import BookingCardList from "@/components/BookingCardList";
import FAQ from "@/components/FAQ";
import SearchBar from "@/components/SearchBar";
import { getRecordings } from "@/lib/actions/recording.actions";
import { getStreams } from "@/lib/actions/stream.actions";
import { isUserSubscribed } from "@/lib/actions/subscription.actions";
import { is } from "date-fns/locale";
import { VideoIcon, Webcam } from "lucide-react";
import React from "react";

export default async function Page() {
  return (
    <section className="mt-20 container max-w-[1200px]">
      <h1 className="text-2xl md:text-4xl font-bold text-center py-10">FAQ</h1>

      <FAQ />
    </section>
  );
}
