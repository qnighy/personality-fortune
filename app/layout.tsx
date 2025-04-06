import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personality Assessment",
  description: "A crystal-clear view of your personality (joke app)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
