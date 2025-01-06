import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aratuku",
    template: "%s | Aratuku",
  },
  description: "An all-in-one workspace for art teachers",
  metadataBase: new URL("https://tabula.your-domain.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://tabula-sand.vercel.app",
    siteName: "Aratuku",
    title: {
      default: "Aratuku",
      template: "%s | Aratuku",
    },
    description: "An all-in-one workspace for art teachers",
    images: [
      {
        url: "https://tabula-sand.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Aratuku - An all-in-one workspace for art teachers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aratuku",
    description: "An all-in-one workspace for art teachers",
    images: [
      {
        url: "https://tabula-sand.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Aratuku - An all-in-one workspace for art teachers",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
