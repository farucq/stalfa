import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import MouseFollower from '@/components/ui/MouseFollower';
import HoverFooter from "@/components/ui/hover-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stalfa 3D",
  description: "3D Visualization Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black`}>
        <div className="relative min-h-screen w-full overflow-hidden">
          <MouseFollower className="z-[10000]" />
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
          </div>
          <main className="relative z-10 min-h-screen w-full">
            {children}
          </main>
          <HoverFooter />
        </div>
      </body>
    </html>
  );
}
