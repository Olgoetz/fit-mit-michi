import RecordingForm from "@/components/RecordingForm";
import React from "react";

const NewRecording = () => {
  return (
    <div className="flex h-screen justify-center max-w-[1000px] w-full">
      <RecordingForm
        breadcrumbs={[
          { label: "Aufzeichnungen", href: "/admin/aufzeichnungen" },
          {
            label: "erstellen",
            href: "/admin/aufzeichnungen/erstellen",
            active: true,
          },
        ]}
        description="Fülle alle Felder aus, um eine neu Aufzeichung zu erstellen"
      />
    </div>
  );
};

export default NewRecording;
