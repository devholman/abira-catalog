import Mailgun from "mailgun.js";
import formData from "form-data";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,
});

export async function sendEmail(to: string, subject: string, html: string) {
  const messageData = {
    from: "abirasports@gmail.com", // Use a verified sender email
    to,
    subject: subject || "Hello",
    text: "Testing some Mailgun awesomeness!",
    html: html || "<h1>Testing some Mailgun awesomeness!</h1>",
  };

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, messageData);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
}
