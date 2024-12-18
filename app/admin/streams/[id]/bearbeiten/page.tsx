import StreamForm from "@/components/StreamForm";
import { getStreamById } from "@/lib/actions/stream.actions";

const EditStream = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const stream = await getStreamById(params.id);
  return (
    <div className="flex h-screen justify-center  max-w-[1000px] w-full">
      <StreamForm
        breadcrumbs={[
          { label: "Streams", href: "/admin/streams" },
          {
            label: "bearbeiten",
            href: "/admin/streams/bearbeiten",
            active: true,
          },
        ]}
        description="Jedes Feld kann bearbeitet werden"
        stream={stream}
      />
    </div>
  );
};

export default EditStream;
