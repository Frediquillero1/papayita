import type { Metadata } from "next";
import { DM_Sans  } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Papayita Your Marketplace, Your Rules.",
  description: "At Papayita, we believe that true luxury lies in refinement — in the details that elevate the everyday and transform the ordinary into the extraordinary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
