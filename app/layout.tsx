import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sites Dev Lab",
  description: "LAB-000 — GitHub synchronization workflow verification site.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
