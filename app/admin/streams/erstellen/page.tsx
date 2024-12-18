import StreamForm from "@/components/StreamForm";
import React from "react";

const NewRecording = () => {
  return (
    <div className="flex h-screen justify-center max-w-[1000px] w-full">
      <StreamForm
        breadcrumbs={[
          { label: "Streams", href: "/admin/streams" },
          {
            label: "erstellen",
            href: "/admin/streams/erstellen",
            active: true,
          },
        ]}
        description="Fülle alle Felder aus, um einen neuen Stream zu erstellen"
      />
    </div>
  );
};

export default NewRecording;
