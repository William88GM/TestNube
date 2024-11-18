"use client";
import ContextSession from "@/services/functions/ContextSession";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import { useEffect } from "react";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <body>
        <ContextSession>


          <Header />
          <main className="h-[86vh] p-6 overflow-auto ">
            {children}
          </main>

          <Footer />
          <Toaster />
        </ContextSession>
      </body>
    </html>
  );
}
