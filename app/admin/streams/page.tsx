import { Separator } from "@/components/ui/separator";
import { PlusIcon, WebcamIcon } from "lucide-react";
import Link from "next/link";

import StreamsList from "@/components/StreamsTable";

const Streams = () => {
  return (
    <div className=" ">
      <div className="flex gap-2">
        <WebcamIcon className="size-16 bg-gray-100 p-2 rounded-lg text-pink-700" />
        <div className="flex flex-col font-semibold leading-none tracking-tight justify-center">
          <h2 className="text-xl font-extrabold flex md:text-2xl">Streams</h2>
          <h3 className="text-muted-foreground text-sm">
            Hier kannst Du deine aktuell erstellten Streams sehen und neue
            erstellen
          </h3>
        </div>
      </div>
      <Separator className="my-8" />

      <Link
        href="/admin/streams/erstellen"
        className="flex items-center justify-center gap-x-2 w-[150px] bg-pink-700 text-white p-4 rounded-md hover:bg-pink-400"
      >
        <PlusIcon className="size-8" />
        <p>Neu</p>
      </Link>

      <p className="text-xl py-12">aktuelle Streams</p>
      <StreamsList />
    </div>
  );
};

export default Streams;
