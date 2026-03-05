import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CONSTANTS } from "../data/constants";
import ChatBot from "../components/ChatBot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: CONSTANTS.siteParams.title,
  description: CONSTANTS.siteParams.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="text-stone-900 antialiased font-sans flex flex-col min-h-screen">
        <div className="bg-noise"></div>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
