import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }: any) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 🔥 This exposes auth errors immediately
  await transporter.verify();

  await transporter.sendMail({
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
