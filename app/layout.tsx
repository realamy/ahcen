"use client";
import { type PropsWithChildren } from "react";
import "@/styles/globals.css";
import localFont from "@next/font/local";
import { Inter } from "@next/font/google";
import { ClientProvider } from "~/client/client";
import clsxm from "@/lib/clsxm";
import Header from "@/components/header";
import Footer from "@/components/footer";

const sfPro = localFont({
  src: "../public/fonts/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

interface RootLayoutProps extends PropsWithChildren {}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClientProvider>
      <html className={inter.className}>
        <body>
          <Header />
          <main
            className={clsxm(
              sfPro.variable,
              inter.variable,
              "flex w-full flex-col items-center justify-center py-32",
            )}
          >
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClientProvider>
  );
}
