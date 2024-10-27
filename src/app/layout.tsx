import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stock App",
  description: "Second Iteration of My Stock Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        
        {children}

        <footer className="py-6 px-4 md:px-6 border-t">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © 2024 StockPro. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
      </body>
    </html>
  );
}
