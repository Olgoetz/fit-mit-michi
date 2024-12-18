import { BookingEmailWrapper } from "@/emails/EmailWrapper";
import { EmailProps } from "@/types";
import { formatDate } from "@/lib/utils";

const mockProps: any = {
  recording: {
    title: "Yoga Session",
    description: "A relaxing yoga class to unwind and rejuvenate.",
    startDate: new Date(), // Replace with a sample date
    duration: 60,

    id: "12345",
    createdAt: new Date(), // Replace with a sample date
    updatedAt: new Date(), // Replace with a sample date
    imageUrl: "/static/Oli.jpg",
    videoUrl: "https://example.com",
    price: 20,
  },
  invoiceUrl: "https://example.com/invoice/12345",

  customer: "John Doe",
};

Email.defaultProps = mockProps;

export function Email(props: EmailProps) {
  const { invoiceUrl, customer } = props;
  const recording: Recording = props.recording as Recording;
  const data = [
    {
      title: "Titel",
      description: recording.title,
    },
    {
      title: "Beschreibung",
      description: recording.description,
    },

    {
      title: "Dauer",
      description: `${recording.duration} Minuten`,
    },
  ];

  return (
    <>
      <BookingEmailWrapper
        invoiceUrl={invoiceUrl}
        imageUrl={recording.imageUrl}
        customer={customer}
        bookingText={`${recording.title}`}
      >
        <div className="my-8">
          <p>Hier sind die Daten:</p>

          <div className="pl-4 text-sm ">
            {data.map((item) => (
              <div className="" key={item.title}>
                <h3 className="font-bold text-sm">{item.title}:</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </BookingEmailWrapper>
    </>
  );
}

export default Email;
