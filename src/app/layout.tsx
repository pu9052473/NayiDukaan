import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";

import NavBar from "@/Components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nayi Dukaan",

  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <NavBar />

        {children}
      </body>
    </html>
  );
}
