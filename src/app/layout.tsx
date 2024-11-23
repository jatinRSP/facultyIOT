"use client";

import "./globals.css";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import OfflineNotification from "@/components/OfflineNotification";
import { registerServiceWorker } from "@/lib/RegisterSW";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <OfflineNotification />
        {children}
      </body>
    </html>
  );
}
