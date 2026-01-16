import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "RecoveryOS Platform",
  description: "Rooms shell and Universal Player surface."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
