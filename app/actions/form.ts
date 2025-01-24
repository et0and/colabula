"use server";

import { FeedbackAdminEmail, FeedbackCustomerEmail } from "@/emails/templates";
import { resend } from "@/lib/email";
import { FeedbackFormData } from "@/types/feedback";

export async function submitFeedback(data: FeedbackFormData) {
  if (!process.env.FORM_API_ENDPOINT || !process.env.FORM_API_KEY) {
    throw new Error("Missing required environment variables for form submission.");
  }

  const response = await fetch(process.env.FORM_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FORM_API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    await resend.emails.send({
      from: "Colabula <mail@mail.colabula.com>",
      to: data.email,
      subject: "Your recent Colabula feedback",
      react: FeedbackCustomerEmail(),
    });

    await resend.emails.send({
      from: "Colabula <mail@mail.colabula.com>",
      to: "info@colabula.com",
      replyTo: data.email,
      subject: "New Colabula feedback submission",
      react: FeedbackAdminEmail({
        firstName: data.firstName,
        lastName: data.lastName,
        school: data.school,
        email: data.email,
        pastExperience: data.pastExperience,
        generalFeedback: data.generalFeedback,
      }),
    });
  }

  return response.ok;
}
