import type { Metadata } from "next";
import { Space_Grotesk, Micro_5 } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import SessionWrapper from "@/app/SessionWrapper";
import Header from "@/ui/Header/Header";
import { MuteProvider } from "@/context/MuteContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const micro5 = Micro_5({
  variable: "--font-micro5",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Echoes",
  description: "Une nouvelle façon de partager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${spaceGrotesk.variable} ${micro5.variable}`}>
          <UserProvider>
            <MuteProvider>
              <Header />
              <main>{children}</main>
            </MuteProvider>
          </UserProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
