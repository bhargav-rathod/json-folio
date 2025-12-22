import type { Metadata } from "next";
import "./globals.css";
import { primaryFont } from './config/theme';

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${primaryFont.variable}`}>
      <body className={`${primaryFont.className} bg-gray-900 text-white`}>
        {children}
      </body>
    </html>
  );
}