import { BookingEmailWrapper } from "@/emails/EmailWrapper";
import { EmailProps } from "@/types";
import { formatDate, formatToCurrency } from "@/lib/utils";

const mockProps: any = {
  stream: {
    title: "Yoga Session",
    description: "A relaxing yoga class to unwind and rejuvenate.",
    startDate: new Date(), // Replace with a sample date
    duration: 60,
    zoomLink: "https://zoom.us/j/123456789",
    meetingId: "123456789",
    meetingPassword: "yoga123",
    id: "12345",
    createdAt: new Date(), // Replace with a sample date
    updatedAt: new Date(), // Replace with a sample date
    imageUrl: "/static/Oli.jpg",
    price: 20,
  },
  invoiceUrl: "https://example.com/invoice/12345",

  customer: "John Doe",
};

Email.defaultProps = mockProps;

export function Email(props: EmailProps) {
  const { invoiceUrl, customer } = props;
  const stream: Stream = props.stream as Stream;

  const data = [
    {
      title: "Titel",
      description: stream.title,
    },
    {
      title: "Beschreibung",
      description: stream.description,
    },
    {
      title: "Preis",
      description: `${formatToCurrency(stream.price.toString())}`,
    },
    {
      title: "Datum",
      description: `${formatDate(stream.startDate, true)} Uhr`,
    },
    {
      title: "Dauer",
      description: `${stream.duration} Minuten`,
    },
    {
      title: "Zoom Link",
      description: <a href={stream.zoomLink}>{stream.zoomLink}</a>,
    },
    {
      title: "Meeting ID",
      description: stream.meetingId,
    },
    {
      title: "Meeting Password",
      description: stream.meetingPassword,
    },
  ];

  return (
    <>
      <BookingEmailWrapper
        invoiceUrl={invoiceUrl}
        imageUrl={stream.imageUrl}
        customer={customer}
        bookingText={`${stream.title} am ${formatDate(stream.startDate)}`}
      >
        <div className="my-8">
          <p>Hier sind die Daten:</p>

          <div className="pl-4">
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
