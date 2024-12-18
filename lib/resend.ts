// import { EmailSendProps } from "@/types";

import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// export async function sendEmail({ recipient, subject, react }: EmailSendProps) {
//   try {
//     await resend.emails.send({
//       from: `M. Süßbauer <${process.env.RESEND_FROM_EMAIL}>`,
//       to: recipient,
//       bcc: process.env.BCC_EMAIL,
//       subject,
//       react,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
