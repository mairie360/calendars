import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calendars",
  description: "The Calendars's module.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Mairie360" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
