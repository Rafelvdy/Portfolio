import type { Metadata } from "next";
import { Roboto, Montserrat, Inter } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StratosFi",
  description: "StratosFi is a web development and hosting company that creates custom websites tailored to your needs, whether that's a fast Next.js site for maxmimum performance, or a Wordpress setup that gives you full control to update content whenver you want. No templates, no compromises, just a profressional site that actually works for your business. Let's build something you'll be proud to show off.",
  keywords: ["web development", "hosting", "next.js", "wordpress", "react", "tailwind", "shadcn", "ui", "ux", "design", "development", "hosting", "website", "website development", "website hosting", "website design", "website development", "website hosting", "website design"],
  authors: [{ name: "Rafe Loveday", url: "https://linkedin.com/in/rafe-loveday" }],
  creator: "Rafe Loveday",
  publisher: "Rafe Loveday",
  openGraph: {
    title: "StratosFi",
    description: "StratosFi is a web development and hosting company that creates custom websites tailored to your needs, whether that's a fast Next.js site for maxmimum performance, or a Wordpress setup that gives you full control to update content whenver you want. No templates, no compromises, just a profressional site that actually works for your business. Let's build something you'll be proud to show off.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${roboto.variable} ${montserrat.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
