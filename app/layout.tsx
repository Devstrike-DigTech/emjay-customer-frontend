import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emjay — Premium Beauty Store & Services",
  description:
    "Emjay is your go-to beauty store for cosmetics, skincare, hair care products, and more — plus in-store beauty services. Shop premium brands and book professional treatments in Uyo.",
  keywords: ["beauty store", "cosmetics", "skincare", "hair care", "beauty products", "Emjay", "Uyo", "makeup", "beauty services"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
