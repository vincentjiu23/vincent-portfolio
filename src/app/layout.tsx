import type { Metadata } from "next";
import { Inter, Bebas_Neue, Press_Start_2P } from "next/font/google";
import BootProvider from "@/components/BootProvider";
import TopNavigation from "@/components/layout/TopNavigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas-neue" });
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start-2p" });

export const metadata: Metadata = {
  title: "Vincent Jiu | Developer & Designer",
  description: "Personal portfolio of Vincent Jiu - Frontend Engineer, Data Enthusiast, Cybersecurity Explorer, and UI Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable} ${pressStart2P.variable} font-sans bg-background text-textMain`}>
        <BootProvider>
          <TopNavigation />
          <main className="pt-20">
            {children}
          </main>
        </BootProvider>
      </body>
    </html>
  );
}
