import type { Metadata } from "next";
import { Sora } from "next/font/google";
import ParticleBackground from "@/components/ParticleBackground";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "CryptoPix - Enterprise-Grade Security Solutions",
  description: "Secure your digital future with CryptoPix. Military-grade encryption, real-time threat detection, and 24/7 monitoring for businesses of all sizes.",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} antialiased`}
      >
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}
