import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "./(providers)/posthog";
import { TRPCProvider } from "./(providers)/trpc";

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
    default: "Colabula",
    template: "%s | Colabula",
  },
  description: "An all-in-one workspace for art teachers",
  metadataBase: new URL("https://colabula.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://colabula.com",
    siteName: "Colabula",
    title: {
      default: "Colabula",
      template: "%s | Colabula",
    },
    description: "An all-in-one workspace for art teachers",
    images: [
      {
        url: "https://colabula.com/og.png",
        width: 1200,
        height: 630,
        alt: "Colabula - An all-in-one workspace for art teachers",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Colabula",
    description: "An all-in-one workspace for art teachers",
    images: [
      {
        url: "https://colabula.com/og.png",
        width: 1200,
        height: 630,
        alt: "Colabula - An all-in-one workspace for art teachers",
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
      <head>
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          name="description"
          content="An all-in-one workspace for art teachers"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <TRPCProvider>
          <PostHogProvider>{children}</PostHogProvider>
        </TRPCProvider>
        <Toaster />
      </body>
    </html>
  );
}
