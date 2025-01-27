import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Share your thoughts and help improve Colabula",
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
