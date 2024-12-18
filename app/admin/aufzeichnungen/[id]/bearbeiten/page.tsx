import RecordingForm from "@/components/RecordingForm";
import { getRecordingById } from "@/lib/actions/recording.actions";

const EditRecording = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const recording = await getRecordingById(params.id);
  return (
    <div className="flex min-h-screen justify-center max-w-[1200px] w-full">
      <RecordingForm
        breadcrumbs={[
          { label: "Aufzeichnungen", href: "/admin/aufzeichnungen" },
          {
            label: "bearbeiten",
            href: "/admin/aufzeichnungen/bearbeiten",
            active: true,
          },
        ]}
        description="Jedes Feld kann bearbeitet werden"
        recording={recording}
      />
    </div>
  );
};

export default EditRecording;
