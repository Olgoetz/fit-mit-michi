import { getRecordings } from "@/lib/actions/recording.actions";
import React from "react";
import { DataTable } from "./ui/data-table";
import { recordingColumns } from "./RecordingsTableColumns";
import { log } from "@/lib/logger";

const RecordingsList = async () => {
  const recordings = await getRecordings();

  // log({
  //   level: "debug",
  //   filePath: "/components/RecordingsTable.tsx",
  //   message: "Current recordings",
  //   data: recordings,
  // });
  return (
    <div className=" ">
      <DataTable columns={recordingColumns} data={recordings} />
    </div>
  );
};

export default RecordingsList;
