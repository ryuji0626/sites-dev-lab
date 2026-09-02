import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sites Dev Lab",
  description: "ChatGPT Sitesの機能を再現可能な証拠として記録する検証サイト。",
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
