import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a new account",
  openGraph: {
    title: "Sign up",
    description: "Create a new account",
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
