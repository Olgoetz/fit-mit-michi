import { getStreams } from "@/lib/actions/stream.actions";
import React from "react";
import { DataTable } from "./ui/data-table";
import { streamColumns } from "./StreamsTableColumns";
import { log } from "@/lib/logger";

const StreamsList = async () => {
  const streams = await getStreams();

  // Remove outdated streams
  // streams.forEach((stream) => {
  //   if (new Date(stream.startDate) < new Date()) {
  //     console.log("Stream is outdated");
  //   }
  // });

  // const filtered_steams = streams.filter(
  //   (stream) => new Date(stream.startDate) > new Date()
  // );

  if (streams.length === 0) {
    return (
      <div className="italic">
        <p>Noch keine Streams erstellt</p>
      </div>
    );
  }

  log({
    level: "debug",
    filePath: "/components/StreamsTable.tsx",
    message: "Current streams",
    data: streams,
  });
  return (
    <div className=" ">
      <DataTable columns={streamColumns} data={streams} />
    </div>
  );
};

export default StreamsList;
