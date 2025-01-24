"use server";

import { FeedbackAdminEmail, FeedbackCustomerEmail } from "@/emails/templates";
import { resend } from "@/lib/email";
import { FeedbackFormData } from "@/types/feedback";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export async function submitFeedback(data: FeedbackFormData) {
  const sanitizedData = {
    ...data,
    firstName: purify.sanitize(data.firstName),
    lastName: purify.sanitize(data.lastName),
    pastExperience: purify.sanitize(data.pastExperience),
    generalFeedback: purify.sanitize(data.generalFeedback),
  };

  if (!process.env.FORM_API_ENDPOINT || !process.env.FORM_API_KEY) {
    throw new Error(
      "Missing required environment variables for form submission."
    );
  }

  const response = await fetch(process.env.FORM_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FORM_API_KEY}`,
    },
    body: JSON.stringify(sanitizedData),
  });

  if (response.ok) {
    await resend.emails.send({
      from: "Colabula <mail@mail.colabula.com>",
      to: sanitizedData.email,
      subject: "Your recent Colabula feedback",
      react: FeedbackCustomerEmail(),
    });

    await resend.emails.send({
      from: "Colabula <mail@mail.colabula.com>",
      to: "info@colabula.com",
      replyTo: sanitizedData.email,
      subject: "New Colabula feedback submission",
      react: FeedbackAdminEmail({
        firstName: sanitizedData.firstName,
        lastName: sanitizedData.lastName,
        school: sanitizedData.school,
        email: sanitizedData.email,
        pastExperience: sanitizedData.pastExperience,
        generalFeedback: sanitizedData.generalFeedback,
      }),
    });
  }

  return response.ok;
}
