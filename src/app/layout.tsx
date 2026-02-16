import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Credat",
  description: "The developer SDK for EU Digital Identity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
