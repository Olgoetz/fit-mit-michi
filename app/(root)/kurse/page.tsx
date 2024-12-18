import BookingCardList from "@/components/BookingCardList";
import SearchBar from "@/components/SearchBar";
import { getRecordings } from "@/lib/actions/recording.actions";
import { getStreams } from "@/lib/actions/stream.actions";
import { isUserSubscribed } from "@/lib/actions/subscription.actions";
import { is } from "date-fns/locale";
import { VideoIcon, Webcam } from "lucide-react";
import React from "react";

export default async function Kurse(props: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const recordings = await getRecordings({ onlyPublished: true });
  const streams = await getStreams(true);

  const { validSubscription } = await isUserSubscribed();
  // Filter out outdated streams
  const filtered_streams = streams.filter(
    (stream) => new Date(stream.startDate) > new Date()
  );

  return (
    <div className="mt-20 container max-w-[1400px]">
      <h1 className="text-2xl md:text-4xl font-bold text-center py-10">
        Kurse
      </h1>
      <SearchBar />

      {validSubscription && (
        <div className="text-center text-lg text-gray-500 my-6">
          Du hast eine gültige Mitgliedschaft. Viel Spaß beim Trainieren! 🎉
        </div>
      )}

      {/* Sections for showing "streams" */}
      <div className="flex items-center font-bold my-12 pb-6  border-b-2 border-b-pink-500">
        <Webcam className="size-6 md:size-12 mr-4" />

        <h2 className="text-2xl md:text-3xl ">
          Streams ({filtered_streams.length})
        </h2>
      </div>
      <div className="pb-6">
        <BookingCardList
          isSubscribed={validSubscription}
          items={filtered_streams}
          query={query}
        />
      </div>

      {/* Sections for showing "recordings" */}
      <div className="flex items-center font-bold my-12 pb-6  border-b-2 border-b-pink-500">
        <VideoIcon className="size-6 md:size-12 mr-4" />

        <h2 className="text-2xl md:text-3xl ">
          Aufzeichnungen ({recordings.length})
        </h2>
      </div>
      <div className="pb-6">
        <BookingCardList
          isSubscribed={validSubscription}
          items={recordings}
          query={query}
        />
      </div>
    </div>
  );
}
